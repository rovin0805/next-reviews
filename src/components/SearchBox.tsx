"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Combobox } from "@headlessui/react";
import { useIsClient } from "@/lib/hooks";
import type { SearchableReview } from "@/lib/reviews";

// TODO: debounce input

export default function SearchBox() {
  const router = useRouter();
  const isClient = useIsClient();
  const [query, setQuery] = useState("");
  const [reviews, setReviews] = useState<SearchableReview[]>([]);

  useEffect(() => {
    if (query.length > 1) {
      (async () => {
        const response = await fetch(
          "/api/search?query=" + encodeURIComponent(query),
        );
        const reviews = await response.json();
        setReviews(reviews);
      })();
    } else {
      setReviews([]);
    }
  }, [query]);

  const handleChange = (review: SearchableReview) => {
    router.push(`/reviews/${review.slug}`);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative w-48">
      <Combobox onChange={handleChange}>
        <Combobox.Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search…"
          className="w-full rounded border px-2 py-1"
        />
        <Combobox.Options className="absolute w-full bg-white py-1">
          {reviews.map((review) => (
            <Combobox.Option key={review.slug} value={review}>
              {({ active }) => (
                <span
                  className={`block w-full truncate px-2 ${
                    active ? "bg-sky-100" : ""
                  }`}
                >
                  {review.title}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
