export const ROLLUP_CATEGORIES = [
  { label: "Gin", value: "gin", slug: "gin" },
  { label: "Sparkling", value: "sparkling", slug: "sparkling" },
  { label: "Tequila", value: "tequila", slug: "tequila" },
  { label: "Vodka", value: "vodka", slug: "vodka" },
  { label: "Whisky", value: "whisky", slug: "whisky" },
] as const;

export type AlcoholCategoryValue = (typeof ROLLUP_CATEGORIES)[number]["value"];
