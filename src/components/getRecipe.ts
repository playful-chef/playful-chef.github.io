import type { Ingredient } from "./ingredients";

export async function getRecipe(
  basePrompt: string,
  selectedIngredients: string[],
): Promise<Recipe | Text | null> {
  if (selectedIngredients.length === 0 && !basePrompt) return null;

  const ingredientPrompt = selectedIngredients.length
    ? `у меня есть продукты: ${selectedIngredients.join(", ")}`
    : "";
  const prompt = [basePrompt, ingredientPrompt].filter(Boolean).join(". ");

  const url = new URL("https://api.thoughtspile.tech/agent");
  url.searchParams.append("user_message", prompt);
  url.searchParams.append("user_id", "11");

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ingredients: ${response.status}`);
  }
  const { agent_response } = await response.json();
  if (!agent_response || typeof agent_response !== "object") {
    return { text: agent_response };
  }

  return {
    ...agent_response,
    categories: agent_response.categories?.split(/,\s+/g) ?? [],
    directions: agent_response.directions
      .split(/Шаг \d+:\s*/g)
      .map((s: string) => s.trim())
      .filter((s: string) => !!s),
  };
}

export type Recipe = {
  title: string;
  link: string;
  directions: string[];
  ingredients: Ingredient[];
  description: string;
  categories: string[];
  total_time: string;
  servings: number;
  source_url: string;
};

type Text = {
  text: string;
};
