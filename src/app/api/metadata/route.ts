// app/api/metadata/route.ts
import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';

export async function GET(req: NextRequest) {
  try {
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
  } catch (error: any) {
    console.error('Metadata fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 });
  }
}
