import { writeFileSync } from "fs";
import qs from "qs";

// reviews
// const url =
//   "http://localhost:1337/api/reviews?" +
//   qs.stringify(
//     {
//       fields: ["slug", "title", "subtitle", "publishedAt"],
//       populate: { image: { fields: ["url"] } },
//       sort: ["publishedAt:desc"],
//       pagination: { pageSize: 6 },
//     },
//     { encodeValuesOnly: true },
//   );

// review
const url =
  "http://localhost:1337/api/reviews?" +
  qs.stringify(
    {
      filters: { slug: { $eq: "hades-2018" } },
      fields: ["slug", "title", "subtitle", "publishedAt", "body"],
      populate: { image: { fields: ["url"] } },
      pagination: { pageSize: 6, page: 1 },
    },
    { encodeValuesOnly: true },
  );

const response = await fetch(url);
const body = await response.json();
const formatted = JSON.stringify(body, null, 2);
const file = "scripts/strapi-response.json";
writeFileSync(file, formatted, "utf8");
