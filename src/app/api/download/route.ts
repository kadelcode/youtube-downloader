// Import necessary modules
import { NextRequest }  from 'next/server'; // Next.js module for handling server requests
import ytdl from 'ytdl-core'; // Library to download YouTube videos

// Define an asynchronous function to handle GET requests
export async function GET(req: NextRequest) {
    // Extract the video URL from the query parameters of the request
    const videoURL = req.nextUrl.searchParams.get('url');

    // Check if the video URL is missing or invalid
    if (!videoURL || !ytdl.validateURL(videoURL)) {
        // Return a 400 Bad Request response if the URL is invalid
        return new Response('Invalid URL', { status: 400 });
    }

    // Fetch information about the video using the ytdl library
    const info = await ytdl.getInfo(videoURL);

    // Choose the highest quality video format available
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });

    // Create a readable stream for the video using the chosen format
    const videoStream = ytdl(videoURL, { format });

    // Return the video stream as a response
    return new Response(videoStream as any, {
        headers: {
            // Set the Content-Disposition header to suggest a filename for the downloaded file
            'Content-Disposition': `attachment; filename="${info.videoDetails.title}.mp4`,
            // Set the Content-Type header to indicate the MIME type of the response
            'Content-Type': 'video/mp4',
        },
    });
}