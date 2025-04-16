import { NextRequest } from 'next/server';
import ytdl from 'ytdl-core';

export const runtime = 'nodejs';

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
    const nodeStream = ytdl(videoURL, { quality: Number(itag) });

    // Convert Node.js Readable stream to a Web-compatible ReadableStream
    const webStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of nodeStream) {
          controller.enqueue(new Uint8Array(chunk));
        }
        controller.close();
      },
      cancel(reason) {
        console.log('Stream cancelled', reason);
        nodeStream.destroy();
      },
    });

    return new Response(webStream, {
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': 'attachment; filename="video.mp4"',
      },
    });
  } catch (err: unknown) {
    let errorMessage = 'Failed to download video';

    if (err instanceof Error) {
      errorMessage = err.message;
      console.error('Download error:', err.message);
    } else {
      console.error('Unknown error:', err);
    }

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
