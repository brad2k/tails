import markdoc from "@astrojs/markdoc";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import { defineConfig, fontProviders } from "astro/config";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://www.bradazevedo.com/tails/",

  fonts: [
    {
      name: "DM Sans",
      cssVariable: "--font-DMSans",
      provider: fontProviders.google(),
      weights: [400, 500, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Climate Crisis",
      cssVariable: "--font-ClimateCrisis",
      weights: ["400"],
      styles: ["normal"],
      options: {
        experimental: {
          variableAxis: {
            YEAR: [["1979", "2050"]],
          },
        },
      },
    },
    {
      provider: fontProviders.google(),
      name: "Fraunces",
      cssVariable: "--font-Fraunces",
      weights: ["400 900"],
      styles: ["normal", "italic"],
      options: {
        experimental: {
          variableAxis: {
            SOFT: [["0", "100"]],
            WONK: [["0", "1"]],
          },
        },
      },
    },
  ],

  adapter: netlify(),
  integrations: [react(), markdoc(), keystatic()],
});
