import { Metadata } from "next";
import { VideoCard } from "@/components/VideoCard";
import { Play } from "lucide-react";
import { getPayload } from "payload";
import config from '@payload-config';

export const metadata: Metadata = {
    title: 'Videos',
    description: 'Watch product demonstrations, tutorials, and informational videos about our electrical products and solutions.',
    keywords: ['product videos', 'electrical product demos', 'tutorials', 'Aman Enterprises videos'],
    openGraph: {
        title: 'Videos - Aman Enterprises',
        description: 'Watch product demonstrations and tutorials about our electrical products.',
    },
};


export default async function VideosPage() {
    const payload = await getPayload({ config });

    const videoRes = await payload.find({
        collection: 'videos',
        depth: 1,
        sort: '-craetedAt',
    });

    const videos = videoRes.docs;

    return (
        <div className="py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold md:text-4xl">Videos</h1>
                    <p className="mt-2 text-muted-foreground">
                        Watch product demonstrations, tutorials, and more
                    </p>
                </div>

                {/* Videos Grid */}
                {videos && videos.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {videos.map((video) => (
                            <VideoCard key={video.id} url={video.url} title={video.title} description={video.description} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-lg border border-dashed p-12 text-center">
                        <Play className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-semibold">No Videos Available</h3>
                        <p className="mt-2 text-muted-foreground">
                            Product videos and tutorials will appear here once added.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
