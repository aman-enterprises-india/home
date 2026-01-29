import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "../payload-types";



export function ProductCard({ title, slug, images, category, price }: Product) {
    const imageUrl = images?.[0]?.image?.url;

    return (
        <Card className="group overflow-hidden transition-all hover:shadow-lg">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        No Image
                    </div>
                )}
            </div>
            <CardContent className="p-4">
                {category && (
                    <p className="text-xs text-muted-foreground mb-1">
                        {category?.name}
                    </p>
                )}
                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>
                {price !== undefined && (
                    <p className="mt-2 text-lg font-bold text-primary">
                        ₹{price?.toLocaleString("en-IN")}
                    </p>
                )}
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button asChild variant="outline" className="w-full">
                    <Link href={`/products/${slug}`}>View Details</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
