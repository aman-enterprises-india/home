import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Phone } from "lucide-react";
import { getPayload } from "payload";
import config from '@payload-config';
import Gallery from "@/components/Gallery";
import { Metadata } from "next";
import { Richtext } from "@/components/Richtext";

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
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
    });

    const product = productRes.docs[0];

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    const description = product?.description?.root?.children?.[0]?.children?.[0]?.text ||
        `Buy ${product.title} at best prices from Aman Enterprises. Quality electrical products with warranty.`;

    return {
        title: product.title,
        description: description.substring(0, 160),
        keywords: [product.title, product?.category?.name || 'electrical products', 'buy online', 'Aman Enterprises'],
        openGraph: {
            title: `${product.title} - Aman Enterprises`,
            description: description.substring(0, 160),
            type: 'website',
            images: product?.images?.[0]?.image?.url ? [
                {
                    url: product.images[0].image.url,
                    alt: product.title,
                }
            ] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: product.title,
            description: description.substring(0, 160),
        },
    };
}

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

    const basePrice = product?.price && product?.gstRate
        ? product.price / (1 + parseInt(product?.gstRate) / 100)
        : null;
    const gstAmount = product?.price && basePrice
        ? product.price - basePrice
        : null;
    const savings = product?.mrp && product?.price
        ? product.mrp - product.price
        : null;

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
                    <Gallery title={product?.title} images={product?.images} />
                    {/* Product Details */}
                    <div className="space-y-6">
                        {product?.category && (
                            <Link href={`/products?category=${product?.category?.slug}`}>
                                <Badge variant="secondary">{product?.category?.name}</Badge>
                            </Link>
                        )}

                        <h1 className="text-3xl font-bold md:text-4xl">{product?.title}</h1>

                        {/* {product?.price !== undefined && (
                            <div className="space-y-1">
                                <p className="text-lg font-bold text-primary">
                                    <span className="text-red-500 font-medium">-{product?.discount}%</span> ₹{product?.price?.toLocaleString("en-IN")}
                                </p>
                                <p className="font-light text-gray-600">MRP: ₹{product?.mrp?.toLocaleString("en-IN")}</p>
                            </div>
                        )} */}



                        {/* Price Details Section */}
                        {product?.price !== undefined && (
                            <Card className="bg-gray-50">
                                <CardContent className="p-4 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl font-bold text-primary">
                                            ₹{product?.price?.toLocaleString("en-IN")}
                                        </span>
                                        {product?.discount && product?.discount > 0 && (
                                            <Badge variant="destructive" className="text-sm">
                                                {product?.discount}% OFF
                                            </Badge>
                                        )}
                                    </div>

                                    {product?.mrp && product?.price && product.mrp > product.price && (
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <span>MRP:</span>
                                            <span className="line-through decoration-gray-500">
                                                ₹{product?.mrp?.toLocaleString("en-IN")}
                                            </span>
                                            {savings && savings > 0 && (
                                                <span className="text-green-600 font-medium">
                                                    (You save ₹{savings.toLocaleString("en-IN")})
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {product?.gstRate !== undefined && (
                                        <>
                                            <Separator />
                                            <div className="text-sm text-muted-foreground space-y-1">
                                                <p className="font-medium">Price Breakdown:</p>
                                                <div className="flex justify-between">
                                                    <span>Base Price:</span>
                                                    <span>₹{basePrice?.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>GST ({product.gstRate}%):</span>
                                                    <span>₹{gstAmount?.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                                                </div>
                                                <p className="text-xs pt-1">* Price inclusive of all taxes</p>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {product?.description && (
                            <div>
                                <h2 className="font-semibold mb-2">Description</h2>
                                {/* <p className="text-muted-foreground whitespace-pre-line">
                                    {product?.description.root.children[0].children[0].text}
                                </p> */}
                                <Richtext content={product?.description} />
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
            </div>
        </div>
    );
}
