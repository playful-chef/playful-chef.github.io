import sortBy from "just-sort-by";

const recipeCutoff = 0.3;

export async function getRecipe(
  selectedIngredients: string[]
): Promise<Recipe | null> {
  if (selectedIngredients.length === 0) return null;

  const ratedRecipes = recipes
    .map((recipe) => ({
      recipe,
      match:
        recipe.ingredients.filter((ig) => selectedIngredients.includes(ig))
          .length / recipe.ingredients.length,
    }))
    .filter((r) => r.match > recipeCutoff);

  return sortBy(ratedRecipes, (r) => r.match)?.[0]?.recipe ?? null;
}

export type Recipe = {
  name: string;
  ingredients: string[];
  instructions: string;
  time: number;
};

const recipes: Recipe[] = [
  {
    name: "Garlic Butter Shrimp Pasta",
    ingredients: [
      "shrimp",
      "pasta",
      "garlic",
      "butter",
      "lemon",
      "parsley",
      "pepper",
    ],
    instructions:
      "Cook pasta according to package directions. In a large pan, melt butter and sauté garlic until fragrant. Add shrimp and cook until pink. Squeeze lemon juice over shrimp, add pepper. Toss with drained pasta and garnish with parsley.",
    time: 20,
  },
  {
    name: "Cheesy Chicken and Broccoli Rice",
    ingredients: ["chicken", "rice", "broccoli", "cheese", "garlic", "onion"],
    instructions:
      "Cook rice. Sauté diced onion and garlic. Add cubed chicken and cook through. Steam broccoli until tender. Combine all ingredients in a pot, stir in shredded cheese until melted.",
    time: 30,
  },
  {
    name: "Beef and Bell Pepper Stir-fry",
    ingredients: [
      "beef",
      "bell pepper",
      "onion",
      "garlic",
      "soy sauce",
      "ginger",
    ],
    instructions:
      "Slice beef into thin strips. Stir-fry beef until browned, remove from pan. Sauté sliced bell peppers, onion, and garlic. Return beef to pan, add soy sauce and ginger. Cook until heated through.",
    time: 25,
  },
  {
    name: "Spinach and Mushroom Omelette",
    ingredients: ["eggs", "spinach", "mushroom", "cheese", "onion"],
    instructions:
      "Sauté sliced mushrooms and onion until tender. Add spinach and cook until wilted. Beat eggs and pour over vegetables. Cook until set, sprinkle cheese on one half, fold over.",
    time: 15,
  },
  {
    name: "Pork Chops with Apple Compote",
    ingredients: ["pork", "apple", "onion", "thyme", "butter"],
    instructions:
      "Season pork chops with pepper and thyme. Pan-sear until cooked through. In separate pan, sauté sliced apples and onion with butter until soft. Serve compote over pork chops.",
    time: 25,
  },
  {
    name: "Creamy Tomato Pasta",
    ingredients: ["pasta", "tomato", "garlic", "milk", "butter", "basil"],
    instructions:
      "Cook pasta. Sauté garlic in butter, add diced tomatoes and cook until softened. Stir in milk and simmer until slightly thickened. Toss with pasta, garnish with fresh basil.",
    time: 20,
  },
  {
    name: "Fish with Lemon Herb Butter",
    ingredients: ["fish", "lemon", "butter", "thyme", "garlic"],
    instructions:
      "Season fish with pepper and thyme. Pan-fry until cooked through. In separate pan, melt butter with minced garlic and lemon juice. Pour lemon butter sauce over fish before serving.",
    time: 15,
  },
  {
    name: "Cheesy Potato and Carrot Bake",
    ingredients: ["potato", "carrot", "cheese", "milk", "butter"],
    instructions:
      "Slice potatoes and carrots thinly. Layer in baking dish with cheese between layers. Mix milk with melted butter and pour over. Bake at 375°F until vegetables are tender and top is golden.",
    time: 45,
  },
  {
    name: "Yogurt Marinated Chicken",
    ingredients: ["chicken", "yogurt", "garlic", "lemon", "oregano"],
    instructions:
      "Mix yogurt, minced garlic, lemon juice, and oregano. Marinate chicken for at least 30 minutes. Bake or grill until fully cooked.",
    time: 40,
  },
  {
    name: "Beef and Potato Skillet",
    ingredients: ["beef", "potato", "onion", "garlic", "paprika"],
    instructions:
      "Brown ground beef with diced onion and garlic. Add cubed potatoes and paprika. Cover and cook until potatoes are tender, stirring occasionally.",
    time: 35,
  },
  {
    name: "Shrimp and Garlic Rice",
    ingredients: ["shrimp", "rice", "garlic", "lemon", "butter"],
    instructions:
      "Cook rice. In separate pan, sauté garlic in butter, add shrimp and cook until pink. Squeeze lemon over shrimp. Mix shrimp with cooked rice.",
    time: 20,
  },
  {
    name: "Broccoli Cheese Soup",
    ingredients: ["broccoli", "cheese", "milk", "onion", "butter"],
    instructions:
      "Sauté chopped onion in butter. Add chopped broccoli and cook until tender. Stir in milk and simmer. Blend if desired, then stir in shredded cheese until melted.",
    time: 25,
  },
  {
    name: "Pork Fried Rice",
    ingredients: ["pork", "rice", "eggs", "carrot", "soy sauce"],
    instructions:
      "Cook diced pork until done, set aside. Scramble eggs, set aside. Sauté diced carrot. Add cooked rice, pork, eggs, and soy sauce. Stir-fry until heated through.",
    time: 20,
  },
  {
    name: "Spinach and Cheese Stuffed Chicken",
    ingredients: ["chicken", "spinach", "cheese", "garlic"],
    instructions:
      "Butterfly chicken breasts. Mix chopped spinach, cheese, and garlic. Stuff mixture into chicken, secure with toothpicks. Bake until chicken is cooked through.",
    time: 35,
  },
  {
    name: "Mushroom and Thyme Pasta",
    ingredients: ["pasta", "mushroom", "garlic", "butter", "thyme"],
    instructions:
      "Cook pasta. Sauté sliced mushrooms and garlic in butter until golden. Add fresh thyme. Toss mushroom mixture with drained pasta.",
    time: 20,
  },
  {
    name: "Fish with Tomato and Basil",
    ingredients: ["fish", "tomato", "basil", "lemon", "garlic"],
    instructions:
      "Season fish with pepper. Top with sliced tomatoes, minced garlic, and basil. Bake until fish flakes easily. Squeeze lemon over before serving.",
    time: 25,
  },
  {
    name: "Beef and Carrot Stew",
    ingredients: ["beef", "carrot", "potato", "onion", "garlic"],
    instructions:
      "Brown beef cubes. Add diced onion and garlic, cook until fragrant. Add cubed carrots and potatoes, cover with water. Simmer until meat and vegetables are tender.",
    time: 60,
  },
  {
    name: "Cheesy Garlic Bread",
    ingredients: ["bread", "cheese", "garlic", "butter"],
    instructions:
      "Mix softened butter with minced garlic. Spread on bread slices, top with shredded cheese. Bake at 375°F until cheese is melted and bubbly.",
    time: 10,
  },
  {
    name: "Chicken and Rice Soup",
    ingredients: ["chicken", "rice", "carrot", "onion", "thyme"],
    instructions:
      "Cook diced chicken until done. Add diced carrot and onion, cook until tender. Add cooked rice, thyme, and enough water to make soup. Simmer 10 minutes.",
    time: 30,
  },
  {
    name: "Pork with Apples and Onions",
    ingredients: ["pork", "apple", "onion", "thyme"],
    instructions:
      "Season pork with pepper and thyme. Brown in pan, then remove. Sauté sliced apples and onions until tender. Return pork to pan, cover and cook until pork is done.",
    time: 30,
  },
  {
    name: "Shrimp Scampi",
    ingredients: ["shrimp", "garlic", "lemon", "butter", "pasta"],
    instructions:
      "Cook pasta. In large pan, melt butter and sauté garlic. Add shrimp and cook until pink. Squeeze lemon juice over shrimp. Toss with drained pasta.",
    time: 20,
  },
  {
    name: "Broccoli and Cheese Baked Potato",
    ingredients: ["potato", "broccoli", "cheese", "butter"],
    instructions:
      "Bake potatoes until tender. Steam broccoli until tender. Split potatoes, fluff with butter. Top with broccoli and shredded cheese.",
    time: 45,
  },
  {
    name: "Beef and Onion Skewers",
    ingredients: ["beef", "onion", "soy sauce", "garlic"],
    instructions:
      "Cube beef and marinate in soy sauce with minced garlic. Thread beef and onion chunks onto skewers. Grill or broil until beef is cooked to preference.",
    time: 25,
  },
  {
    name: "Spinach and Feta Omelette",
    ingredients: ["eggs", "spinach", "cheese", "onion"],
    instructions:
      "Sauté onion until soft, add spinach and cook until wilted. Beat eggs and pour over vegetables. When almost set, sprinkle cheese on one half and fold over.",
    time: 15,
  },
  {
    name: "Lemon Herb Chicken",
    ingredients: ["chicken", "lemon", "thyme", "oregano", "garlic"],
    instructions:
      "Season chicken with herbs, pepper, and minced garlic. Squeeze lemon juice over chicken. Bake or pan-fry until cooked through, basting with lemon juice.",
    time: 30,
  },
  {
    name: "Mushroom Rice Pilaf",
    ingredients: ["rice", "mushroom", "onion", "garlic", "butter"],
    instructions:
      "Sauté sliced mushrooms, onion, and garlic in butter. Add rice and stir to coat. Add water according to rice package directions and cook until done.",
    time: 25,
  },
  {
    name: "Fish Cakes",
    ingredients: ["fish", "bread", "eggs", "lemon", "parsley"],
    instructions:
      "Flake cooked fish and mix with bread crumbs, beaten egg, lemon juice, and parsley. Form into patties and pan-fry until golden brown on both sides.",
    time: 20,
  },
  {
    name: "Cheesy Beef and Pasta",
    ingredients: ["beef", "pasta", "tomato", "cheese", "onion"],
    instructions:
      "Brown ground beef with onion. Add diced tomatoes and simmer. Cook pasta separately. Combine all ingredients, stir in shredded cheese until melted.",
    time: 25,
  },
  {
    name: "Garlic Butter Pork Chops",
    ingredients: ["pork", "garlic", "butter", "thyme"],
    instructions:
      "Season pork chops with pepper and thyme. Pan-fry until cooked. In same pan, melt butter with minced garlic. Pour garlic butter over pork chops before serving.",
    time: 20,
  },
  {
    name: "Apple Cinnamon Oatmeal",
    ingredients: ["oats", "apple", "milk", "sugar", "cinnamon"],
    instructions:
      "Cook oats with milk according to package directions. Stir in diced apple, sugar, and cinnamon. Cook until apples are tender.",
    time: 15,
  },
];
