"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/videos", label: "Videos" },
    { href: "/contact", label: "Contact" },
];

interface HeaderProps {
    companyName?: string;
    gstNo?: string;
}

export function Header({ companyName = "Aman Enterprises", gstNo }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b shadow-lg">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg">
                        <Image src='/assets/logo.png' alt="logo" width={100} height={100} />
                    </div>
                    <span className="text-lg font-bold tracking-tight">{companyName}</span>
                    <span className="hidden sm:inline text-lg text-gray-800 border-l pl-2 ml-1">GST: {gstNo}</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href="/contact">
                            Get Quote
                        </Link>
                    </Button>
                </nav>

                {/* Mobile Navigation */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon" className="text-nav-foreground hover:bg-nav-muted/20">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <SheetHeader>
                            <SheetTitle className="flex items-center gap-2">
                                <Image src='/assets/logo.png' alt="logo" width={100} height={100} />
                                {companyName}
                            </SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col gap-4 mt-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Button asChild className="mt-4 bg-accent text-primary hover:bg-accent/90">
                                <Link href="/contact" onClick={() => setIsOpen(false)}>
                                    Get Quote
                                </Link>
                            </Button>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
