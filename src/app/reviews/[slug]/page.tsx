import { Metadata } from "next";
import Heading from "@/components/Heading";
import { getReview, getSlugs } from "@/lib/reviews";
import ShareLinkButton from "@/components/ShareLinkButton";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ReviewPageParams {
  slug: string;
}

interface ReviewPageProps {
  params: ReviewPageParams;
}

export async function generateMetadata({
  params: { slug },
}: ReviewPageProps): Promise<Metadata> {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  return { title: review.title };
}

// export const dynamic = "force-dynamic";

export async function generateStaticParams(): Promise<ReviewPageParams[]> {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ReviewPage({
  params: { slug },
}: ReviewPageProps) {
  const review = await getReview(slug);

  if (!review) {
    notFound();
  }

  const { title, date, image, body, subtitle } = review;

  return (
    <>
      <Heading>{title}</Heading>
      <p className="pb-3 font-semibold">{subtitle}</p>
      <div className="flex items-baseline gap-3">
        <p className="pb-2 italic">{date}</p>
        <ShareLinkButton />
      </div>
      <Image
        priority
        src={image}
        alt=""
        width={640}
        height={360}
        className="mb-2 rounded"
      />
      <article
        dangerouslySetInnerHTML={{ __html: body }}
        className="prose prose-slate max-w-screen-sm"
      />
    </>
  );
}
