import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiting map (IP -> timestamps array)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 15;

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

function sanitize(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>?/gm, '')
    .trim();
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      endpoint: '/api/newsletter',
      methods: ['POST', 'GET'],
      service: 'Pop Lab Studio Newsletter Subscription API',
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
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown-ip';

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please wait a moment before trying again.',
        },
        { status: 429 }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: 'Malformed request payload. JSON format required.',
        },
        { status: 400 }
      );
    }

    // Honeypot check for bots
    if (body._hp && typeof body._hp === 'string' && body._hp.trim().length > 0) {
      return NextResponse.json(
        {
          success: true,
          message: 'Subscribed successfully.',
        },
        { status: 200 }
      );
    }

    const rawEmail = sanitize(body.email);

    if (!rawEmail) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email address is required.',
        },
        { status: 400 }
      );
    }

    if (rawEmail.length > 254 || !EMAIL_REGEX.test(rawEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide a valid, deliverable email address.',
        },
        { status: 400 }
      );
    }

    const subscription = {
      email: rawEmail.toLowerCase(),
      source: sanitize(body.source || 'website-footer'),
      subscribedAt: new Date().toISOString(),
      ip: clientIp,
      userAgent: req.headers.get('user-agent') || '',
    };

    // Log subscription notice
    console.log(`[NEWSLETTER] New subscription: ${subscription.email} from ${subscription.source}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Subscribed successfully to Pop Lab Studio notes.',
        email: subscription.email,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error: any) {
    console.error('[API /api/newsletter] Internal Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An internal error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}
