import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export function ProductPagination({ currentPage, totalPages }: { currentPage: number | undefined, totalPages: number }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <Pagination className="mt-8">
            <PaginationContent>
                {currentPage && currentPage > 1 && (
                    <PaginationItem>
                        <PaginationPrevious href={`?page=${currentPage - 1}`} />
                    </PaginationItem>
                )}

                {pages.map((p) => (
                    <PaginationItem key={p}>
                        <PaginationLink
                            href={`?page=${p}`}
                            isActive={p === currentPage}
                            className={p === currentPage ? "border-primary text-primary" : ""}
                        >
                            {p}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {currentPage && currentPage < totalPages && (
                    <PaginationItem>
                        <PaginationNext href={`?page=${currentPage + 1}`} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}