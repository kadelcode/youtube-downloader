/*import { NextRequest } from 'next/server';
import ytdl from 'ytdl-core';
import { Readable } from 'stream';
import { ReadableStream } from 'stream/web';

// Function to convert Node.js Readable stream to web ReadableStream
function toWebReadableStream(nodeStream: Readable): ReadableStream {
  return new ReadableStream({
    start(controller) {
      nodeStream.on('data', (chunk) => {
        controller.enqueue(chunk);
      });
      nodeStream.on('end', () => {
        controller.close();
      });
      nodeStream.on('error', (err) => {
        controller.error(err);
      });
    },
    cancel() {
      nodeStream.destroy();
    }
  });
}

export async function GET(req: NextRequest) {
  const videoURL = req.nextUrl.searchParams.get('url');
  if (!videoURL || !ytdl.validateURL(videoURL)) {
    return new Response('Invalid URL', { status: 400 });
  }

  const info = await ytdl.getInfo(videoURL);
  const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });

  const videoStream = ytdl(videoURL, { format }) as Readable;

  // Convert the Node.js stream to a web ReadableStream
  const webReadableStream = toWebReadableStream(videoStream);

  return new Response(webReadableStream, {
    headers: {
      'Content-Disposition': `attachment; filename="${info.videoDetails.title}.mp4"`,
      'Content-Type': 'video/mp4',
    },
  });
}*/
