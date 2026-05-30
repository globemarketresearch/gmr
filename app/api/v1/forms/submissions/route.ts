import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8080';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const backendRes = await fetch(`${BACKEND_URL}/api/v1/forms/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': request.headers.get('x-forwarded-for') ?? '',
        'X-Real-IP': request.headers.get('x-real-ip') ?? '',
        'User-Agent': request.headers.get('user-agent') ?? '',
        'Referer': request.headers.get('referer') ?? '',
        'Origin': request.headers.get('origin') ?? '',
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error('[forms/submissions] proxy error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'server_error',
        message: 'Internal server error. Please try again.',
      },
      { status: 500 },
    );
  }
}
