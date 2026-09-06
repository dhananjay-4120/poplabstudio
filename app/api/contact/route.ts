import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyAP374g5FmRrr6_QYnNKtZiDUi60uWacUb641cS2qgIQbGLIdD92Hy9efbZx4B-maeJg/exec';

// Simple in-memory rate limiting map (IP -> timestamps array)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

// Basic input sanitizer to strip HTML tags and script injections
function sanitize(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>?/gm, '') // Remove HTML tags
    .replace(/[&<>"'/]/g, (char) => {
      switch (char) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#x27;';
        case '/': return '&#x2F;';
        default: return char;
      }
    })
    .trim();
}

export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      endpoint: '/api/contact',
      methods: ['POST', 'GET'],
      service: 'Pop Lab Studio Lead Intake & Diagnostic API',
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown-ip';

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many submissions. Please wait a minute before trying again.',
        },
        { status: 429 }
      );
    }

    // 2. Parse JSON Body
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: 'Malformed JSON payload in request body.',
        },
        { status: 400 }
      );
    }

    // 3. Honeypot check for bots
    if (body._hp && typeof body._hp === 'string' && body._hp.trim().length > 0) {
      // Silently accept bot submission to prevent bot probing
      return NextResponse.json(
        {
          success: true,
          message: 'Intake received successfully',
          eventId: `lead_bot_${Date.now()}`,
        },
        { status: 200 }
      );
    }

    // 4. Field Validation
    const brandName = sanitize(body.brandName);
    const website = sanitize(body.website);
    const phone = sanitize(body.phone);
    const countryCode = sanitize(body.countryCode) || '+91';
    const adSpend = sanitize(body.adSpend);
    const roadblock = sanitize(body.roadblock);
    const message = sanitize(body.message);
    const email = body.email ? sanitize(body.email) : '';

    const validationErrors: string[] = [];

    if (!brandName || brandName.length < 2) {
      validationErrors.push('Brand or company name must be at least 2 characters.');
    }
    if (brandName.length > 120) {
      validationErrors.push('Brand name cannot exceed 120 characters.');
    }

    if (!website || website.length < 2) {
      validationErrors.push('Website or Instagram profile handle is required.');
    }

    // Extract digits for phone check
    const digitsOnly = phone.replace(/\D/g, '');
    if (!phone || digitsOnly.length < 7 || digitsOnly.length > 16) {
      validationErrors.push('Please enter a valid phone or WhatsApp number (7-15 digits).');
    }

    if (!adSpend) {
      validationErrors.push('Please select your current monthly ad spend range.');
    }

    if (!roadblock) {
      validationErrors.push('Please select your primary growth bottleneck.');
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        validationErrors.push('Please provide a valid email address.');
      }
    }

    if (message && message.length > 2500) {
      validationErrors.push('Additional notes cannot exceed 2500 characters.');
    }

    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validationErrors,
        },
        { status: 400 }
      );
    }

    const fullPhone = `${countryCode} ${phone}`;
    const eventId = body.eventId || `lead_${Math.random().toString(36).substring(2, 10)}_${Date.now()}`;

    const leadRecord = {
      brandName,
      website,
      phone: fullPhone,
      email,
      adSpend,
      roadblock,
      message,
      eventId,
      pageUrl: body.pageUrl || '',
      userAgent: req.headers.get('user-agent') || body.userAgent || '',
      ip: clientIp,
      submittedAt: new Date().toISOString(),
    };

    // 5. Asynchronously forward to Google Apps Script webhook
    if (GOOGLE_SCRIPT_URL) {
      try {
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadRecord),
        }).catch((err) => {
          console.warn('[API /api/contact] Google Script dispatch notice:', err.message);
        });
      } catch (err: any) {
        console.warn('[API /api/contact] Webhook forward error:', err.message);
      }
    }

    // 6. Return Structured Success Response
    return NextResponse.json(
      {
        success: true,
        message: 'Intake received successfully. Proceeding to scheduling...',
        eventId,
        lead: {
          brandName,
          phone: fullPhone,
          adSpend,
        },
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error: any) {
    console.error('[API /api/contact] Internal Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An internal error occurred while processing your request. Please try again.',
      },
      { status: 500 }
    );
  }
}
