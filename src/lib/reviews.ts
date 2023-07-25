import { readFile, readdir } from "fs/promises";
import { marked } from "marked";
import matter from "gray-matter";

export interface Review {
  slug: string;
  title: string;
  date: string;
  image: string;
  body: string;
}

export async function getReview(slug: string): Promise<Review> {
  const text = await readFile(`./src/content/reviews/${slug}.md`, "utf-8");
  const {
    content,
    data: { title, date, image },
  } = matter(text);
  const body = marked(content, { mangle: false, headerIds: false });
  return { slug, title, date, image, body };
}

export async function getSlugs(): Promise<string[]> {
  const files = await readdir(`./src/content/reviews`);
  const slugs = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.slice(0, -".md".length));
  return slugs;
}

export async function getReviews(): Promise<Review[]> {
  const slugs = await getSlugs();
  const reviews = await Promise.all(slugs.map((slug) => getReview(slug)));
  reviews.sort((a, b) => b.date.localeCompare(a.date));
  return reviews;
}

export async function getFeaturedReview(): Promise<Review> {
  const reviews = await getReviews();
  return reviews[0];
}
