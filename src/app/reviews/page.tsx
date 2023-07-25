import { Metadata } from "next";
import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Reviews",
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <>
      <Heading>Reviews</Heading>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review) => {
          const { slug, title, image } = review;
          return (
            <li
              key={slug}
              className="w-80 rounded border bg-white shadow hover:shadow-xl"
            >
              <Link href={`/reviews/${slug}`}>
                <img
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
