import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = '4a7b29e01c5f49d887a3e2b10cd47fa1';
const HOST = 'poplabstudio.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

export async function GET() {
  return NextResponse.json({
    status: 'active',
    host: HOST,
    keyLocation: KEY_LOCATION,
    protocol: 'IndexNow v1.0',
    description: 'Instant search engine indexing ping endpoint for Pop Lab Studio',
  });
}

export async function POST(req: NextRequest) {
  try {
    let urls: string[] = [];
    try {
      const body = await req.json();
      if (Array.isArray(body.urls)) {
        urls = body.urls;
      } else if (typeof body.url === 'string') {
        urls = [body.url];
      }
    } catch {
      // Default to core URLs if empty payload
      urls = [
        `https://${HOST}/`,
        `https://${HOST}/process`,
        `https://${HOST}/contact`,
        `https://${HOST}/journal`,
      ];
    }

    if (urls.length === 0) {
      urls = [`https://${HOST}/`];
    }

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    };

    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: true,
      statusCode: res.status,
      submittedUrls: urls,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to submit URLs to IndexNow',
      },
      { status: 500 }
    );
  }
}
