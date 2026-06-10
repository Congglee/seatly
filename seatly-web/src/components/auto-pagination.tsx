import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { RANGE } from "@/constants/pagination";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AutoPaginationProps {
  page: number;
  pageSize: number;
  pathname?: string;
  isLink?: boolean;
  onClick?: (pageNumber: number) => void;
}

/**
  When range = 2, it applies to the distance at the beginning, end and around the current page

    [1] 2 3 ... 19 20
    1 [2] 3 4 ... 19 20
    1 2 [3] 4 5 ... 19 20
    1 2 3 [4] 5 6 ... 19 20
    1 2 3 4 [5] 6 7 ... 19 20

    1 2 ... 4 5 [6] 8 9 ... 19 20

    1 2 ...13 14 [15] 16 17 ... 19 20


    1 2 ... 14 15 [16] 17 18 19 20
    1 2 ... 15 16 [17] 18 19 20
    1 2 ... 16 17 [18] 19 20
    1 2 ... 17 18 [19] 20
    1 2 ... 18 19 [20]
 */

export default function AutoPagination({
  page,
  pageSize,
  pathname = "/",
  isLink = true,
  onClick = (pageNumber) => {},
}: AutoPaginationProps) {
  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      return null;
    };

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      return null;
    };

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;

        // Condition to return ...
        if (
          page <= RANGE * 2 + 1 &&
          pageNumber > page + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          return renderDotAfter(index);
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index);
          } else if (
            pageNumber > page + RANGE &&
            pageNumber < pageSize - RANGE + 1
          ) {
            return renderDotAfter(index);
          }
        } else if (
          page >= pageSize - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          return renderDotBefore(index);
        }

        return (
          <PaginationItem key={index}>
            {isLink && (
              <PaginationLink
                href={{ pathname, query: { page: pageNumber } }}
                isActive={pageNumber === page}
              >
                {pageNumber}
              </PaginationLink>
            )}
            {!isLink && (
              <Button
                onClick={() => onClick(pageNumber)}
                variant={pageNumber === page ? "outline" : "ghost"}
                className="w-9 h-9 p-0"
              >
                {pageNumber}
              </Button>
            )}
          </PaginationItem>
        );
      });
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {isLink && (
            <PaginationPrevious
              href={page === 1 ? "#" : { pathname, query: { page: page - 1 } }}
              className={cn({
                "pointer-events-none opacity-50": page === 1,
              })}
              tabIndex={page === 1 ? -1 : undefined}
              aria-disabled={page === 1}
            />
          )}
          {!isLink && (
            <Button
              disabled={page === 1}
              className="h-9 p-0 px-2"
              variant="ghost"
              onClick={() => onClick(page - 1)}
            >
              <ChevronLeft className="w-5 h-5" /> Previous
            </Button>
          )}
        </PaginationItem>
        {renderPagination()}

        <PaginationItem>
          {isLink && (
            <PaginationNext
              href={
                page === pageSize
                  ? "#"
                  : { pathname, query: { page: page + 1 } }
              }
              className={cn({
                "pointer-events-none opacity-50": page === pageSize,
              })}
              tabIndex={page === pageSize ? -1 : undefined}
              aria-disabled={page === pageSize}
            />
          )}
          {!isLink && (
            <Button
              disabled={page === pageSize}
              className="h-9 p-0 px-2"
              variant="ghost"
              onClick={() => {
                onClick(page + 1);
              }}
            >
              Next <ChevronRight className="w-5 h-5" />
            </Button>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
