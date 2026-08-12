import type { AlcoholCategoryValue } from "../content/categories";

type CategoryValues = AlcoholCategoryValue | "";

const dialog = document.getElementById("cocktail-dialog") as HTMLDialogElement;
const dialogContainer = document.getElementById("cocktail-container");
const recipes = document.querySelector<HTMLUListElement>(".recipes");
const recipeItems = document.querySelectorAll<HTMLLIElement>(".recipe");
const filterNav = document.querySelector<HTMLUListElement>(".categories");

// Open recipes in the dialog
// recipes?.addEventListener("click", (e) => {
//   // let modifier clicks behave normally (open in new tab, etc.)
//   if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
//     return;

//   // Make sure it's an element
//   if (!(e.target instanceof Element)) return;

//   e.preventDefault();
//   const link = e.target.closest("a");
//   if (!link || link.target === "_blank") return;

//   const { href } = link;

//   loadRecipe(href);
// });

// Fetch the recipe endpoint and inject it into the dialog
// async function loadRecipe(url: string) {
//   const html = await (await fetch(url)).text();
//   const doc = new DOMParser().parseFromString(html, "text/html");
//   const container = doc.getElementById("cocktail-wrapper") as HTMLDivElement;

//   dialogContainer?.replaceChildren(container?.cloneNode(true));
//   dialog?.showModal();
//   history.pushState({ modal: true }, "", url);
// }

// dialog?.addEventListener("close", () => {
//   if (history.state?.modal) history.back();
// });

// window.addEventListener("popstate", (e) => {
//   if (!e.state?.modal && dialog?.open) dialog.close();
// });

// Do the filtering
function applyFilter(category: CategoryValues) {
  // apply the hidden attribute to recipes that aren't part of the category
  recipeItems.forEach((li) => {
    li.hidden = category !== "" && !li.dataset.category?.includes(category);
  });

  // activate the relevant filter button
  filterNav?.querySelectorAll<HTMLButtonElement>("button").forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.category === category),
    );
  });
}

// Set the filter and update the url
function setFilter(category: CategoryValues, { pushHistory = true } = {}) {
  // apply the filter
  applyFilter(category);

  if (!pushHistory) return;
  const url = new URL(location.href);

  // set the category param only if it's a category, i.e. not "everything"
  category
    ? url.searchParams.set("category", category)
    : url.searchParams.delete("category");
  history.replaceState({ filter: category }, "", url);
}

// Set up the category filter event handling
filterNav?.addEventListener("click", (e) => {
  if (!(e.target instanceof Element)) return;

  const button = e.target.closest<HTMLButtonElement>("button[data-category]");
  if (!button) return;
  setFilter((button.dataset.category ?? "") as CategoryValues);
});

// Filter on page load
const initialCategory = (new URLSearchParams(location.search).get("category") ??
  "") as CategoryValues;
setFilter(initialCategory, { pushHistory: false });
