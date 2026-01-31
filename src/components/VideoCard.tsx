import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ExternalLink } from "lucide-react";
import { Video } from "../payload-types";



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

export function VideoCard({ url, title, description }: Video) {
    const youtubeId: string = getYouTubeId(url);

    const thumbnailUrl: string | null = getYouTubeThumbnail(youtubeId);

    return (
        <Card className="group overflow-hidden transition-all hover:shadow-lg">
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                <div className="relative aspect-video overflow-hidden bg-muted">
                    {thumbnailUrl ? (
                        <>
                            <Image
                                src={thumbnailUrl}
                                alt={title}
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
                        {title}
                    </h3>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-muted-foreground hover:text-primary"
                    >
                        <ExternalLink className="h-4 w-4" />
                    </a>
                </div>
                {description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
