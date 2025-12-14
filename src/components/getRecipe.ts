import type { Ingredient } from "./ingredients";

export async function getRecipe(
  basePrompt: string,
  selectedIngredients: string[],
): Promise<(ShortRecipe | Text)[] | Recipe[] | null> {
  if (selectedIngredients.length === 0 && !basePrompt) return null;

  const ingredientPrompt = selectedIngredients.length
    ? `у меня есть продукты: ${selectedIngredients.join(", ")}`
    : "";
  const prompt = [basePrompt, ingredientPrompt].filter(Boolean).join(" ");

  const url = new URL("https://api.thoughtspile.tech/agent");
  url.searchParams.append("user_message", prompt);
  url.searchParams.append("user_id", "11");

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ingredients: ${response.status}`);
  }
  const { agent_response } = await response.json();
  const linkMode = agent_response.includes("https:");
  if (linkMode) {
    const items: ShortRecipe[] = [];
    const lines = agent_response.split("\n");
    for (let i = 0; i < lines.length / 2; i++) {
      if (lines[2 * i + 1].startsWith("https:"))
        items.push({ title: lines[2 * i], url: lines[2 * i + 1] });
    }
    return items;
  } else {
    return [{ text: agent_response }];
  }
}

export type Recipe = {
  title: string;
  ingredients: Ingredient[];
  directions: string;
  time: number;
};

type ShortRecipe = {
  title: string;
  url: string;
};

type Text = {
  text: string;
};
