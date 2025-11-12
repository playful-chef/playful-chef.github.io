import type { Ingredient } from "./ingredients";

export async function getRecipe(
  selectedIngredients: string[]
): Promise<Recipe[] | null> {
  if (selectedIngredients.length === 0) return null;
  const url = new URL("https://api.thoughtspile.tech/recipes");
  for (const el of selectedIngredients) {
    url.searchParams.append("ingredients", el);
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ingredients: ${response.status}`);
  }
  return response.json();
}

export type Recipe = {
  title: string;
  ingredients: Ingredient[];
  directions: string;
  time: number;
};
