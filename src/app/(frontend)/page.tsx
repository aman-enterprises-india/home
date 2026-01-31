import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/src/components/ProductCard";
import { CategoryCard } from "@/src/components/CategoryCard";
import { ArrowRight, Zap, Shield, Truck, Phone } from "lucide-react";
import { getPayload } from "payload";
import config from '@payload-config';
import DotGrid from "@/components/DotGrid";

const features = [
  {
    icon: Zap,
    title: "Quality Products",
    description: "Premium electrical products from trusted manufacturers",
  },
  {
    icon: Shield,
    title: "Safety Certified",
    description: "All products meet ISI and international safety standards",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable delivery across the region",
  },
  {
    icon: Phone,
    title: "Expert Support",
    description: "Technical assistance and customer support available",
  },
];

export default async function HomePage() {
  const payload = await getPayload({ config });
  const [Products, Category] = await Promise.all([
    payload.find({
      collection: 'products',
      limit: 5,
      sort: '-createdAt',
    }),

    payload.find({
      collection: 'categories',
      limit: 10,
      depth: 2,
    })
  ])

  const featuredProducts = Products.docs;
  const categories = Category.docs;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 md:py-32">
        <div className="absolute inset-0 z-0 w-full opacity-50">
          <DotGrid
            dotSize={6}
            gap={16}
            baseColor="#bcbabf"
            activeColor="#1f71f4"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Quality Electrical Products for{" "}
              <span className="text-primary">Every Need</span>
            </h1>
            <p className="mt-6 text-lg text-zinc-400 text-shadow-accent">
              Your trusted partner for premium electrical products, wires, cables,
              and accessories. We deliver quality and reliability you can count on.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/products">
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="mt-2 text-muted-foreground">
                Discover our top-selling electrical products
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/products">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                >
                  <ProductCard images={product.images} title={product.title} slug={product.slug} category={product.category} price={product.price} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-12 text-center">
              <Zap className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No Featured Products</h3>
              <p className="mt-2 text-muted-foreground">
                Featured products will appear here once added.
              </p>
              <Button asChild className="mt-4">
                <Link href="/products">Browse All Products</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      {categories && categories.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold">Shop by Category</h2>
              <p className="mt-2 text-muted-foreground">
                Find what you need in our product categories
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Need Electrical Products?</h2>
          <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
            Get in touch with us for bulk orders, custom requirements, or any
            queries. Our team is ready to help you find the right products.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                Get a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
