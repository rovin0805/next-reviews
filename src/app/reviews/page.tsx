import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Heading from "@/components/Heading";
import PaginationBar from "@/components/PaginationBar";
import SearchBox from "@/components/SearchBox";
import { getReviews } from "@/lib/reviews";

// export const dynamic = "force-dynamic";

// export const revalidate = 60; //seconds

export const metadata: Metadata = {
  title: "Reviews",
};

interface ReviewsPageProps {
  searchParams: { page?: string };
}

const PAGE_SIZE = 4;

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const page = parsePageParam(searchParams.page);
  const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);

  return (
    <>
      <Heading>Reviews</Heading>

      <div className="flex justify-between pb-3">
        <PaginationBar href="/reviews" page={page} pageCount={pageCount} />
        <SearchBox />
      </div>

      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review, index) => {
          const { slug, title, image } = review;
          return (
            <li
              key={slug}
              className="w-80 rounded border bg-white shadow hover:shadow-xl"
            >
              <Link href={`/reviews/${slug}`}>
                <Image
                  priority={index === 0}
                  src={image}
                  alt=""
                  width={320}
                  height={180}
                  className="rounded-t"
                />
                <h2 className="py-1 text-center font-orbitron font-semibold">
                  {title}
                </h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function parsePageParam(paramValue: string) {
  if (paramValue) {
    const page = parseInt(paramValue);
    if (isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;
}
