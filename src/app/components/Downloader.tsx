// This directive is used in Next.js to indicate that the file contains client-side code
"use client";

import Image from 'next/image';

// Import motion for animation effects
import { motion } from 'framer-motion';

// Importing the useState hook from React to manage state in the component
import { useState } from 'react';


// Defining the Downloader component as the default export
export default function Downloader() {

    interface VideoFormat {
        itag: string;
        quality: string;
    }

    interface VideoMetadata {
        title: string;
        thumbnail: string
        lengthSeconds: number;
        formats: VideoFormat[];
    }
    // State to store the YouTube URL entered by the user.
    const [url, setUrl] = useState('');

    // State to manage loading indicators
    const [loading, setLoading] = useState(false);

    // State to manage the fetched video metadata.
    const [video, setVideo] = useState<VideoMetadata | null>(null);

    // State to store the selected format itag.
    const [formatItag, setFormatItag] = useState<string | null>(null);

    // State to store any error messages.
    const [error, setError] = useState('');

    // Function to fetch metadata for the given YouTube URL.
    const fetchMetadata = async () => {
        setError(''); // Clear any previous errors.
        setLoading(true); // Set loading to true to show a loading indicator.
        setVideo(null); // Clear any previous video data.

        try {
            // Fetch metadata from the API
            const res = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`);

            // Throw an error if the response is not ok
            if (!res.ok) throw new Error('Invalid URL');

            const data = await res.json(); // Parse the JSON response.
            setVideo(data); // Set the video data.
            setFormatItag(data.formats[0].itag); // Set the default format itag.
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message); // Set the error message if an error occurs.
            } else {
                setError('An unknow error occurred')
            }
        } finally {
            setLoading(false); // Set loading to false after the fetch is complete.
        }
    };

    const handleDownload = async () => {
        // Function to handle the video dowload.
        if (!url || !formatItag) return; // Return if URL or format itag is not set

        setLoading(true); // Set loading to true to show a loading indicator.
        setError(''); // Clear any previous errors

        try {
            // Fetch the video download URL from the API.
            const response = await fetch(
                `/api/download?url=${encodeURIComponent(url)}&itag=${formatItag}`
            );

            // Throw an error if the response is not ok
            if (!response.ok) throw new Error('Download failed');

            // Get the video blob from the response.
            const blob = await response.blob();

            // Create a URL for the blob.
            const downloadUrl = window.URL.createObjectURL(blob); // Create a URL for the blob.

            // Create a temporary anchor element.
            const a = document.createElement('a');

            // Set the href attribute to the blob URL
            a.href = downloadUrl;

            // Set the download attribute to the video title
            a.click();

            // Remove the anchor element from the DOM.
            a.remove();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message); // Set the error message if an error occurs.
            } else {
                setError('An unknown error occurred')
            }
        } finally {
            setLoading(false); // Set loading to false after the download is complete
        }

    };

    return (
        <main id='download' className='flex flex-col items-center justify-center p-8 bg-blue-50 text-gray-900'>
            <motion.div 
              className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
                <motion.h1
                  className='text-2xl font-bold text-center mb-4'
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                    YouTube Downloader
                </motion.h1>

                <motion.div
                  className='flex gap-2 mb-4'
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                    <input
                      type='text'
                      className='w-full border px-4 py-2 rounded-xl'
                      placeholder='Paste YouTube URL...'
                      value={url}
                      onChange={(e) => setUrl(e.target.value)} // Update the URL state when the input changes.
                    />
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                      onClick={fetchMetadata} // Call fetchMetadata when the button is clicked.
                      disabled={loading} // Disable the button when loading.
                    >
                        {loading ? 'Loading...' : 'Fetch'}
                    </button>
                </motion.div>

                {/* Display error message if there is an error. */}
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                {video && (
                    <motion.div
                      className='mt-4 text-center'
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                        <Image
                          src={video.thumbnail} 
                          alt='Thumbnail' 
                          layout="fill"
                          objectFit="cover"
                          className='rounded-xl mx-auto mb-2' 
                        />
                        <p className='font-semibold'>{video.title}</p>
                        <p className='text-sm text-gray-500 mb-2'>{Math.floor(video.lengthSeconds / 60)} min</p>
                    
                        <select
                          className='w-full border px-4 py-2 rounded-xl mb-3'
                          value={formatItag!}
                          onChange={(e) => setFormatItag(e.target.value)}
                        >
                            {video.formats.map((f: any) => (
                                <option key={f.itag} value={f.itag}>
                                    {f.quality}
                                </option>
                            ))}
                        </select>

                        <button
                          onClick={handleDownload}
                          className='w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl'
                          disabled={loading}
                        >
                            {loading ? 'Downloading...' : 'Download'}
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </main>
    );
}