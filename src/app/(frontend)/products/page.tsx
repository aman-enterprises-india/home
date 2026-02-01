import { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import Link from "next/link";
import { getPayload } from "payload";
import config from '@payload-config';

export const metadata: Metadata = {
    title: 'Products',
    description: 'Browse our complete range of quality electrical products including wires, switches, circuit breakers, and more. Find the best electrical solutions for your needs.',
    keywords: ['electrical products', 'buy electrical items', 'wires', 'switches', 'circuit breakers', 'electrical equipment'],
    openGraph: {
        title: 'Products - Aman Enterprises',
        description: 'Browse our complete range of quality electrical products.',
    },
};


interface ProductsPageProps {
    searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const payload = await getPayload({ config });

    const productRes = await payload.find({
        collection: 'products',
        limit: 10,
        pagination: true,
        sort: '-createdAt',
        depth: 2,
    })

    const categoryRes = await payload.find({
        collection: 'categories',
        sort: '-createdAt',
        depth: 1,
    })
    const categories = categoryRes.docs;
    const products = productRes.docs;
    const params = await searchParams;
    const selectedCategory = params.category;


    // Filter products by category if selected
    const filteredProducts = selectedCategory
        ? (products || []).filter((p) => p.category?.slug === selectedCategory)
        : products || [];

    const selectedCategoryName = selectedCategory
        ? categories?.find((c) => c.slug === selectedCategory)?.name
        : null;

    return (
        <div className="py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold md:text-4xl">
                        {selectedCategoryName ? selectedCategoryName : "All Products"}
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        {selectedCategoryName
                            ? `Browse our ${selectedCategoryName.toLowerCase()} collection`
                            : "Explore our complete range of electrical products"}
                    </p>
                </div>

                {/* Category Filters */}
                {categories && categories.length > 0 && (
                    <div className="mb-8 flex flex-wrap gap-2">
                        <Link href="/products">
                            <Badge
                                variant={!selectedCategory ? "default" : "outline"}
                                className="cursor-pointer px-3 py-1 text-sm"
                            >
                                All
                            </Badge>
                        </Link>
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/products?category=${category.slug}`}
                            >
                                <Badge
                                    variant={
                                        selectedCategory === category.slug ? "default" : "outline"
                                    }
                                    className="cursor-pointer px-3 py-1 text-sm"
                                >
                                    {category.name}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <>
                        <p className="mb-6 text-sm text-muted-foreground">
                            Showing {filteredProducts.length}{" "}
                            {filteredProducts.length === 1 ? "product" : "products"}
                        </p>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                >
                                    <ProductCard images={product.images} title={product.title} slug={product.slug} category={product.category} price={product.price} mrp={product?.mrp} discount={product?.discount} />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="rounded-lg border border-dashed p-12 text-center">
                        <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-semibold">No Products Found</h3>
                        <p className="mt-2 text-muted-foreground">
                            {selectedCategory
                                ? "No products found in this category. Try selecting a different category."
                                : "Products will appear here once they are added to the catalog."}
                        </p>
                        {selectedCategory && (
                            <Button asChild className="mt-4">
                                <Link href="/products">View All Products</Link>
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
