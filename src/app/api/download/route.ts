import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';

export async function GET(req: NextRequest) {
  const videoURL = req.nextUrl.searchParams.get('url');
  if (!videoURL || !ytdl.validateURL(videoURL)) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  const info = await ytdl.getInfo(videoURL);

  const videoDetails = {
    title: info.videoDetails.title,
    thumbnail: info.videoDetails.thumbnails.at(-1)?.url,
    lengthSeconds: info.videoDetails.lengthSeconds,
    formats: info.formats
      .filter(f => f.container === 'mp4' && f.hasVideo)
      .map(f => ({
        quality: f.qualityLabel,
        itag: f.itag,
      })),
  };

  return NextResponse.json(videoDetails);
}
