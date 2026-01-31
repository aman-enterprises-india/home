import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { getPayload } from "payload";
import config from '@payload-config';

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with us for inquiries, quotes, and support. We're here to help with all your electrical product needs.",
};

export default async function ContactPage() {
    const payload = await getPayload({ config });

    const companyInfo = await payload.findGlobal({
        slug: 'company-settings',
    })

    return (
        <div className="py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-bold md:text-4xl">Contact Us</h1>
                    <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                        Have questions about our products? Need a quote? We&apos;re here to help.
                        Reach out to us and we&apos;ll get back to you as soon as possible.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Contact Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Send us a Message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="firstName"
                                            className="text-sm font-medium leading-none"
                                        >
                                            First Name
                                        </label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            placeholder="John"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="lastName"
                                            className="text-sm font-medium leading-none"
                                        >
                                            Last Name
                                        </label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            placeholder="Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium leading-none"
                                    >
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="phone"
                                        className="text-sm font-medium leading-none"
                                    >
                                        Phone Number
                                    </label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="subject"
                                        className="text-sm font-medium leading-none"
                                    >
                                        Subject
                                    </label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        placeholder="Product Inquiry"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="message"
                                        className="text-sm font-medium leading-none"
                                    >
                                        Message
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Tell us about your requirements..."
                                        rows={5}
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    <Send className="mr-2 h-4 w-4" />
                                    Send Message
                                </Button>

                                <p className="text-xs text-muted-foreground text-center">
                                    By submitting this form, you agree to our privacy policy.
                                </p>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {companyInfo ? (
                                    <>
                                        {companyInfo?.contactInfo?.phone.length > 0 && (
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                    <Phone className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Phone</p>
                                                    <div className="text-sm text-muted-foreground space-y-1">
                                                        {companyInfo?.contactInfo?.phone?.split(',').map((p, i) => (
                                                            <a
                                                                key={i}
                                                                href={`tel:${p}`}
                                                                className="block hover:text-foreground transition-colors"
                                                            >
                                                                {p}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {companyInfo?.contactInfo?.email && (
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                    <Mail className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Email</p>
                                                    <a
                                                        href={`mailto:${companyInfo?.contactInfo?.email}`}
                                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                                    >
                                                        {companyInfo.contactInfo.email}
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        {companyInfo?.contactInfo?.address && (
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                    <MapPin className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Address</p>
                                                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                                                        {companyInfo?.contactInfo.address}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <p className="text-muted-foreground">
                                        Contact information will be available soon.
                                    </p>
                                )}

                                <Separator />

                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Business Hours</p>
                                        <div className="text-sm text-muted-foreground">
                                            <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                                            <p>Sunday: Closed</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <Link href="/products">
                                        Browse our product catalog
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <Link href="/videos">
                                        Watch product videos
                                    </Link>
                                </Button>
                                {companyInfo?.contactInfo?.phone && companyInfo?.contactInfo?.phone.length > 0 && (
                                    <Button asChild className="w-full">
                                        <a href={`tel:${companyInfo?.contactInfo.phone.split(',')[0]}`}>
                                            <Phone className="mr-2 h-4 w-4" />
                                            Call Now
                                        </a>
                                    </Button>
                                )}
                            </CardContent>
                        </Card>

                        {/* Social Links */}
                        {companyInfo?.socialLinks && companyInfo.socialLinks.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Follow Us</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {companyInfo.socialLinks.map((social, i) => (
                                            <Button key={i} asChild variant="outline" size="sm">
                                                <a
                                                    href={social.url || "#"}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {social.platform}
                                                </a>
                                            </Button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
