import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/src/components/ProductCard";
import { ArrowLeft, Phone, Package } from "lucide-react";
import { getPayload } from "payload";
import config from '@payload-config';

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}


// export async function generateMetadata({
//     params,
// }: ProductPageProps): Promise<Metadata> {
//     const { slug } = await params;
//     const product = ''

//     if (!product) {
//         return {
//             title: "Product Not Found",
//         };
//     }

//     return {
//         title: product.title,
//         description:
//             product.description || `View details for ${product.title}`,
//     };
// }

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const payload = await getPayload({ config });
    const productRes = await payload.find({
        collection: 'products',
        where: {
            slug: {
                equals: slug,
            }
        },
        depth: 2,
    })
    const product = productRes.docs[0];
    if (!product) {
        notFound();
    }

    // Fetch related products if we have a category
    // let relatedProducts = [];
    // if (product.category?.id) {
    //     relatedProducts = [];
    // }

    const mainImage =
        product?.images && product?.images.length > 0
            ? product?.images[0].image?.url : null;

    return (
        <div className="py-12">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Button asChild variant="ghost" size="sm">
                        <Link href="/products">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Products
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Product Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                            {mainImage ? (
                                <Image
                                    src={mainImage}
                                    alt={product?.title}
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
                        {product?.images && product?.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {product?.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative aspect-square overflow-hidden rounded-md bg-muted"
                                    >
                                        <Image
                                            src={image?.image?.url}
                                            alt={`${product?.title} - Image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="100px"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        {product?.category && (
                            <Link href={`/products?category=${product?.category?.slug}`}>
                                <Badge variant="secondary">{product?.category?.name}</Badge>
                            </Link>
                        )}

                        <h1 className="text-3xl font-bold md:text-4xl">{product?.title}</h1>

                        {product?.price !== undefined && (
                            <p className="text-3xl font-bold text-primary">
                                ₹{product?.price?.toLocaleString("en-IN")}
                            </p>
                        )}

                        {product?.description && (
                            <div>
                                <h2 className="font-semibold mb-2">Description</h2>
                                <p className="text-muted-foreground whitespace-pre-line">
                                    {product?.description.root.children[0].children[0].text}
                                </p>
                            </div>
                        )}

                        <Separator />

                        {/* Specifications */}
                        {product?.specifications && product?.specifications.length > 0 && (
                            <div>
                                <h2 className="font-semibold mb-4">Specifications</h2>
                                <Card>
                                    <CardContent className="p-0">
                                        <dl className="divide-y">
                                            {product?.specifications?.map((spec, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-between px-4 py-3"
                                                >
                                                    <dt className="text-muted-foreground">{spec.label}</dt>
                                                    <dd className="font-medium">{spec.value}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        <Separator />

                        {/* CTA */}
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Interested in this product? Contact us for pricing and
                                availability.
                            </p>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Button asChild size="lg" className="flex-1">
                                    <Link href="/contact">
                                        Get a Quote
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg">
                                    <Link href="/contact">
                                        <Phone className="mr-2 h-4 w-4" />
                                        Contact Us
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {/* {relatedProducts.length > 0 && (
                    <section className="mt-16">
                        <Separator className="mb-8" />
                        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </section>
                )} */}
            </div>
        </div>
    );
}
