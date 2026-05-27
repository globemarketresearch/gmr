import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

/**
 * POST /api/v1/forms/submissions
 * Accepts newsletter, contact, request-sample, request-customization, schedule-demo submissions.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, data, metadata } = body;

    /* ── Basic validation ── */
    if (!category || !data || typeof data !== 'object') {
      return NextResponse.json(
        {
          success: false,
          error: 'validation_error',
          message: 'Missing required fields: category and data.',
        },
        { status: 400 },
      );
    }

    const validCategories = [
      'contact',
      'request-sample',
      'request-customization',
      'schedule-demo',
      'newsletter',
      'publish-news',
    ];

    if (!validCategories.includes(category)) {
      return NextResponse.json(
        {
          success: false,
          error: 'invalid_category',
          message: `Invalid category. Must be one of: ${validCategories.join(', ')}.`,
        },
        { status: 400 },
      );
    }

    const submissionId = randomUUID();
    const createdAt = new Date().toISOString();

    const submission = {
      submissionId,
      category,
      data,
      metadata: {
        ...metadata,
        submittedAt: metadata?.submittedAt ?? createdAt,
        ipAddress:
          request.headers.get('x-forwarded-for') ??
          request.headers.get('x-real-ip') ??
          'unknown',
      },
      createdAt,
    };

    /* ── Log for dev / server-side record ── */
    console.log('[forms/submissions]', JSON.stringify(submission, null, 2));

    return NextResponse.json({
      success: true,
      submissionId,
      category,
      message: getConfirmationMessage(category),
      createdAt,
    });
  } catch (error) {
    console.error('[forms/submissions] error:', error);
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

function getConfirmationMessage(category: string): string {
  switch (category) {
    case 'newsletter':
      return 'Successfully subscribed. Your first brief lands this week.';
    case 'contact':
      return 'Message received. We\'ll respond within 24–48 hours.';
    case 'request-sample':
    case 'request-customization':
      return 'Sample request received. Expect a response within 1 business day.';
    case 'schedule-demo':
      return 'Demo request received. Our team will confirm your slot shortly.';
    case 'publish-news':
      return 'Submission received. Our editorial team will review your content and be in touch within 2 business days.';
    default:
      return 'Submission received. Thank you.';
  }
}
