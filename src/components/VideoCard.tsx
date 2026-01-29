import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity.image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, ExternalLink } from "lucide-react";

interface VideoCardProps {
    video: {
        _id: string;
        title: string;
        videoUrl: string;
        thumbnail?: {
            asset: {
                _ref: string;
            };
        };
        description?: string;
        product?: {
            _id: string;
            title: string;
            slug: string;
        };
    };
}

// Extract YouTube video ID from URL
function getYouTubeId(url: string): string | null {
    const regex =
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Get YouTube thumbnail
function getYouTubeThumbnail(videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function VideoCard({ video }: VideoCardProps) {
    const youtubeId = getYouTubeId(video.videoUrl);

    const thumbnailUrl = video.thumbnail
        ? urlFor(video.thumbnail).width(480).height(270).url()
        : youtubeId
            ? getYouTubeThumbnail(youtubeId)
            : null;

    return (
        <Card className="group overflow-hidden transition-all hover:shadow-lg">
            <a
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                <div className="relative aspect-video overflow-hidden bg-muted">
                    {thumbnailUrl ? (
                        <>
                            <Image
                                src={thumbnailUrl}
                                alt={video.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    <Play className="h-6 w-6 ml-1" fill="currentColor" />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <Play className="h-12 w-12" />
                        </div>
                    )}
                </div>
            </a>
            <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {video.title}
                    </h3>
                    <a
                        href={video.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-muted-foreground hover:text-primary"
                    >
                        <ExternalLink className="h-4 w-4" />
                    </a>
                </div>
                {video.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {video.description}
                    </p>
                )}
                {video.product && (
                    <div className="mt-3">
                        <Badge variant="secondary" className="text-xs">
                            <Link href={`/products/${video.product.slug}`}>
                                {video.product.title}
                            </Link>
                        </Badge>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
