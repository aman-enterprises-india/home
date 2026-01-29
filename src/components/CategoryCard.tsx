import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Category } from "../payload-types";



export function CategoryCard({ category }) {
    const imageUrl = category.image

    return (
        <Link href={`/products?category=${category.slug}`}>
            <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={category.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            {category.name}
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-semibold flex items-center gap-2">
                            {category.name}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </h3>
                        {category.description && (
                            <p className="mt-1 text-sm text-white/80 line-clamp-2">
                                {category.description}
                            </p>
                        )}
                    </div>
                </div>
            </Card>
        </Link>
    );
}
