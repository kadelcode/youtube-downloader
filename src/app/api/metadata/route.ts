// app/api/metadata/route.ts

import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';

export const runtime = 'nodejs'; // Ensure compatibility with ytdl-core

export async function GET(req: NextRequest) {
  try {
    const videoURL = req.nextUrl.searchParams.get('url');

    if (!videoURL || !ytdl.validateURL(videoURL)) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    const info = await ytdl.getInfo(videoURL);

    const { videoDetails, formats } = info;

    const videoDetailsResponse = {
      title: videoDetails.title,
      author: videoDetails.author.name,
      uploadDate: videoDetails.uploadDate,
      views: videoDetails.viewCount,
      lengthSeconds: videoDetails.lengthSeconds,
      thumbnail: videoDetails.thumbnails[videoDetails.thumbnails.length - 1]?.url || null,
      formats: formats
        .filter(f => f.container === 'mp4' && f.hasVideo && f.hasAudio)
        .map(f => ({
          quality: f.qualityLabel,
          itag: f.itag,
        })),
    };

    return NextResponse.json(videoDetailsResponse);
  } catch (error: unknown) {
    const errorMessage = 'Failed to fetch video metadata';

    if (process.env.NODE_ENV === 'development') {
      console.error('Metadata fetch error:', error);
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
