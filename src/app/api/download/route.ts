// /app/api/download/route.ts
export const runtime = 'nodejs'; // Again, very important for ytdl-core

import { NextRequest } from 'next/server';
import ytdl from 'ytdl-core';

export async function GET(req: NextRequest) {
  const videoURL = req.nextUrl.searchParams.get('url');
  const itag = req.nextUrl.searchParams.get('itag');

  if (!videoURL || !ytdl.validateURL(videoURL)) {
    return new Response(JSON.stringify({ error: 'Invalid URL' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!itag || isNaN(Number(itag))) {
    return new Response(JSON.stringify({ error: 'Invalid itag' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const stream = ytdl(videoURL, { quality: Number(itag) });

    return new Response(stream as any, {
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="video.mp4"`,
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
