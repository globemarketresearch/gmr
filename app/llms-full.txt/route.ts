import { generateLLMFullTxt } from '@/lib/api/llmtxt';
import { NextResponse } from 'next/server';

// Revalidate every hour; the full dump is large so we cache aggressively
export const revalidate = 3600;

export async function GET() {
  try {
    const content = await generateLLMFullTxt();

    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating llms-full.txt:', error);
    return new NextResponse('Error generating llms-full.txt', { status: 500 });
  }
}
