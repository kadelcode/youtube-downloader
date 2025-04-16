// app/api/metadata/route.ts
import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  
  if (!url || !ytdl.validateURL(url)) {
    return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
  }

  try {
    const info = await ytdl.getInfo(url);
    const metadata = {
      title: info.videoDetails.title,
      lengthSeconds: info.videoDetails.lengthSeconds,
      author: info.videoDetails.author.name,
      thumbnail: info.videoDetails.thumbnails.pop(),
    };

    return NextResponse.json(metadata);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 });
  }
}
