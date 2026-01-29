import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <FileQuestion className="h-16 w-16 text-muted-foreground" />
            <h1 className="mt-6 text-3xl font-bold">Page Not Found</h1>
            <p className="mt-2 text-muted-foreground max-w-md">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have
                been moved or doesn&apos;t exist.
            </p>
            <div className="mt-8 flex gap-4">
                <Button asChild>
                    <Link href="/">Go Home</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/products">Browse Products</Link>
                </Button>
            </div>
        </div>
    );
}
