import Link from "next/link";
import { Zap, Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface SocialLink {
    platform?: 'LinkedIn' | 'Twitter' | 'Facebook' | 'YouTube' | null;
    url?: string | null;
    id?: string | null;
}

interface FooterProps {
    companyName?: string | null;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    socialLinks?: SocialLink[] | null;
}

const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/videos", label: "Videos" },
    { href: "/contact", label: "Contact" },
];

export function Footer({
    companyName = "Aman Enterprises",
    phone,
    email,
    address,
    socialLinks = [],
}: FooterProps) {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                                <Zap className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-lg font-bold">{companyName}</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Your trusted partner for quality electrical products and solutions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Contact Us</h3>
                        <ul className="space-y-3">
                            {phone && phone.length > 0 && (
                                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                                    <div className="flex flex-col">
                                        {phone.split(',').map((p, i) => (
                                            <span
                                                key={i}
                                                className="hover:text-foreground transition-colors"
                                            >
                                                {p}
                                            </span>
                                        ))}
                                    </div>
                                </li>
                            )}
                            {email && (
                                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Mail className="h-4 w-4 shrink-0" />
                                    <a
                                        href={`mailto:${email}`}
                                        className="hover:text-foreground transition-colors"
                                    >
                                        {email}
                                    </a>
                                </li>
                            )}
                            {address && (
                                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                                    <span className="whitespace-pre-line">{address}</span>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Social Links */}
                    {socialLinks && socialLinks.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="font-semibold">Follow Us</h3>
                            <div className="flex flex-wrap gap-2">
                                {socialLinks.map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.url || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                    >
                                        {social.platform}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} {companyName}. All rights reserved.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Quality Electrical Products & Solutions
                    </p>
                </div>
            </div>
        </footer>
    );
}
