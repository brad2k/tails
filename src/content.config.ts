// @ts-ignore
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const cocktails = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdoc}", base: "./src/content/cocktails" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      ingredients: z.array(
        z.object({
          type: z.string(),
          amount: z.string(),
          unit: z.string(),
          garnish: z.boolean().optional(),
        }),
      ),
      category: z.array(z.string()),
      sourceUrl: z.url().optional(),
      image: image().optional(),
    }),
});

export const collections = { cocktails };
