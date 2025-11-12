export type Ingredient = {
  id: number;
  name: string;
  recipe_count: number;
};

export async function loadIngredients() {
  const response = await fetch("https://api.thoughtspile.tech/ingredients");
  if (!response.ok) {
    throw new Error(`Failed to fetch ingredients: ${response.status}`);
  }
  return (await response.json()) as Ingredient[];
}
