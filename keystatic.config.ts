import { config, fields, collection } from "@keystatic/core";
import { ROLLUP_CATEGORIES } from "./src/content/categories";

export default config({
  storage: {
    kind: "local",
  },
  ui: {
    brand: {
      name: "Tails",
    },
  },
  collections: {
    cocktails: collection({
      label: "Cocktails",
      slugField: "name",
      path: "src/content/cocktails/*",
      format: { contentField: "directions" },
      columns: ["name"],
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        ingredients: fields.array(
          fields.object({
            type: fields.text({ label: "Ingredient" }),
            amount: fields.text({
              label: "Amount",
              description:
                "Allows fractions (e.g., 3/4, 1 1/2) or whole numbers.",
            }),
            unit: fields.select({
              label: "Unit",
              options: [
                { label: "Ounces (oz)", value: "oz" },
                { label: "Dash(es)", value: "dashes" },
                { label: "Milliliters (ml)", value: "ml" },
                { label: "Sprig(s)", value: "sprig" },
                { label: "Leaf/Leaves", value: "leaves" },
                { label: "Peel(s)", value: "peel" },
                { label: "Wedge(s)", value: "wedge" },
                { label: "Wheel(s)", value: "wheel" },
                { label: "Tablespoon(s)", value: "tbsp" },
                { label: "Teaspoon(s)", value: "tsp" },
                { label: "Twist(s)", value: "twist" },
                { label: "Slice(s)", value: "slice" },
                { label: "Pinch", value: "pinch" },
                { label: "Count / Whole / Piece", value: "count" },
              ],
              defaultValue: "oz",
            }),
            garnish: fields.checkbox({
              label: "Garnish",
              description: "This ingredient is a garnish",
            }),
          }),
          {
            label: "Ingredients",

            itemLabel: (props) => {
              const amount = props.fields?.amount?.value
                ? `${props.fields.amount.value} `
                : "";
              const unit = props.fields?.unit?.value
                ? `${props.fields.unit.value} of `
                : "";
              const type = props.fields?.type?.value || "New Ingredient";

              return `${amount}${unit}${type}`; // e.g., "3/4 oz of Bourbon"
            },
          },
        ),
        category: fields.multiselect({
          label: "Categories",
          options: ROLLUP_CATEGORIES.map(({ label, value }) => ({
            label,
            value,
          })),
          defaultValue: ["gin"],
        }),
        image: fields.image({
          label: "Cocktail Photo",
          directory: "src/images/cocktails",
          publicPath: "../../images/cocktails/",
        }),
        sourceUrl: fields.text({
          label: "Original recipe URL",
          description: "Optional link to where you found the recipe.",
        }),
        directions: fields.markdoc({
          label: "Directions",
        }),
      },
    }),
  },
});
