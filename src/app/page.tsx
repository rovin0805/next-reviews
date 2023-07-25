import Heading from "@/components/Heading";
import { getFeaturedReview } from "@/lib/reviews";
import Link from "next/link";

export default async function HomePage() {
  const { slug, image, title } = await getFeaturedReview();
  return (
    <>
      <Heading>Reviews Home</Heading>
      <div className=" w-80 rounded border bg-white shadow hover:shadow-xl sm:w-full">
        <Link href={`/reviews/${slug}`} className="flex flex-col sm:flex-row">
          <img
            src={image}
            alt=""
            width={320}
            height={180}
            className="rounded-t sm:rounded-l sm:rounded-r-none"
          />
          <h2 className="py-1 text-center font-orbitron font-semibold sm:px-2">
            {title}
          </h2>
        </Link>
      </div>
    </>
  );
}
