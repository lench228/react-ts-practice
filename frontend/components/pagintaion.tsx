"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  return (
    <article>
      <ul className="flex space-x-2 justify-center my-4">
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <li key={page}>
              <Link
                href={`${pathname}?page=${page}`}
                className={`px-3 py-2 rounded ${
                  page === currentPage
                    ? "bg-blue-500 text-[#fafa]"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {page}
              </Link>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default Pagination;
