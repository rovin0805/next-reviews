import { Metadata } from "next";
import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";
import Image from "next/image";
import PaginationBar from "@/components/PaginationBar";

// export const dynamic = "force-dynamic";

// export const revalidate = 60; //seconds

export const metadata: Metadata = {
  title: "Reviews",
};

interface ReviewsPageProps {
  searchParams: { page?: string };
}

const PAGE_SIZE = 3;

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const page = parsePageParam(searchParams.page);
  const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);

  return (
    <>
      <Heading>Reviews</Heading>
      <PaginationBar href="/reviews" page={page} pageCount={pageCount} />

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
