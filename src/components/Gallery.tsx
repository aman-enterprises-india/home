'use client'

import { Package } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Media } from "../payload-types"

interface GalleryProps {
    title: string
    images?: Array<{
        image?: number | Media;
        id?: string | null;
    }> | null
}

export default function Gallery({ title, images }: GalleryProps) {
    const [mainImage, setMainImage] = useState(images[0].image.url);

    return (
        // Products Gallery
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-muted">
                {mainImage ? (
                    <Image
                        src={mainImage}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <Package className="h-24 w-24" />
                    </div>
                )}
            </div>

            {/* Thumbnail Gallery */}
            {images && images.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                        <button key={index} onClick={() => setMainImage(image?.image.url)} className={`relative aspect-square overflow-hidden rounded-md bg-muted border-2 transition-all ${mainImage === image.image.url
                            ? 'border-orange-300' // High-action orange for active state
                            : 'border-transparent hover:border-zinc-300'
                            }`}>
                            <Image
                                src={image?.image?.url}
                                alt={`${title} - Image ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="100px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}