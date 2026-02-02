import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function CategoryCard({ category, compact = false }) {
    const imageUrl = category?.image?.url;

    return (
        <Link href={`/products?category=${category?.slug}`}>
            <Card className={`group overflow-hidden transition-all hover:shadow-lg flex-shrink-0 ${compact ? 'w-[180px] sm:w-[200px]' : 'w-full'}`}>
                <div className={`relative overflow-hidden bg-muted ${compact ? 'aspect-square' : 'aspect-4/3'}`}>
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={category?.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes={compact ? "200px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"}
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
                            {category?.name}
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className={`absolute bottom-0 left-0 right-0 text-white ${compact ? 'p-3' : 'p-4'}`}>
                        <h3 className={`font-semibold flex items-center gap-1.5 ${compact ? 'text-sm' : 'text-base'}`}>
                            {category?.name}
                            <ArrowRight className={`transition-transform group-hover:translate-x-1 ${compact ? 'h-3 w-3' : 'h-4 w-4'}`} />
                        </h3>
                        {!compact && category?.description && (
                            <p className="mt-1 text-sm text-white/80 line-clamp-2">
                                {category?.description}
                            </p>
                        )}
                    </div>
                </div>
            </Card>
        </Link>
    );
}
