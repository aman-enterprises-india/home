import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { ArrowRight, Zap, Shield, Truck, Phone } from "lucide-react";
import { getPayload } from "payload";
import config from '@payload-config';
import DotGrid from "@/components/DotGrid";
import { MapSection } from "@/components/MapSection";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Aman Enterprises - Your trusted partner for quality electrical products and solutions. Browse our wide range of electrical components, wires, switches, and more.',
  openGraph: {
    title: 'Aman Enterprises - Quality Electrical Products & Solutions',
    description: 'Welcome to Aman Enterprises - Your trusted partner for quality electrical products and solutions.',
  },
};

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

  const companySettings = await payload.findGlobal({
    slug: 'company-settings',
    select: {
      contactInfo: {
        phone: true,
        address: true,
      },
      googleMapsLink: true,
    },
  })

  const featuredProducts = Products.docs;
  const categories = Category.docs;
  const whatsappUrl = `https://wa.me/${companySettings?.contactInfo?.phone?.split(',')[0]}`

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-transparent to-accent/5 py-20 md:py-32">
        <div className="absolute inset-0 z-0 w-full opacity-50">
          <DotGrid
            dotSize={6}
            gap={16}
            baseColor="#c8d4e0"
            activeColor="#3b82f6"
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
              Quality Electrical Panels for{" "}
              <span className="text-primary">Every Need</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Your trusted partner for premium electrical products, panels
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
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Contact Us</a>
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
                  <ProductCard
                    images={product.images}
                    title={product.title}
                    slug={product.slug}
                    category={product.category}
                    price={product.price}
                    mrp={product?.mrp}
                    discount={product?.discount}
                    gstRate={product?.gstRate}
                  />
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold">Shop by Category</h2>
                <p className="mt-2 text-muted-foreground">
                  Find what you need in our product categories
                </p>
              </div>
              <Button asChild variant="outline" className="hidden sm:flex">
                <Link href="/products">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
              {categories.slice(0, 6).map((category) => (
                <CategoryCard key={category.id} category={category} compact />
              ))}
              {/* View All Card */}
              <Link
                href="/products"
                className="flex-shrink-0 w-[180px] sm:w-[200px] aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/50 transition-all flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary"
              >
                <ArrowRight className="h-8 w-8" />
                <span className="font-medium text-sm">View All Categories</span>
              </Link>
            </div>
            <div className="mt-4 sm:hidden text-center">
              <Button asChild variant="outline" size="sm">
                <Link href="/products">
                  View All Categories
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
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

      <MapSection address={companySettings?.contactInfo?.address} embedUrl='https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3579.5388230953836!2d73.01418747541548!3d26.211676377071985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDEyJzQyLjAiTiA3M8KwMDEnMDAuMyJF!5e0!3m2!1sen!2sin!4v1769933215668!5m2!1sen!2sin' googleMapsLink={companySettings?.googleMapsLink} />
    </div>
  );
}
