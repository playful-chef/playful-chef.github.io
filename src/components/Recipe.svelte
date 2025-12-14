<script lang="ts">
  import { getRecipe } from "./getRecipe";

  type Props = { selectedIngredients: string[]; basePrompt: string };

  let { selectedIngredients, basePrompt }: Props = $props();

  // State for tracking loading and error
  let isLoading = $state(false);
  let error = $state(false);
  let recipes: Awaited<ReturnType<typeof getRecipe>> = $state(null);

  async function loadRecipes({ basePrompt, selectedIngredients }: Props) {
    if (!basePrompt && selectedIngredients.length === 0) return;

    isLoading = true;
    try {
      recipes = await getRecipe(basePrompt, selectedIngredients);
    } catch (err) {
      error = true;
    } finally {
      isLoading = false;
    }
  }

  $effect(() => {
    loadRecipes({ basePrompt, selectedIngredients });
  });
</script>

<div class="recipes-section">
  {#if selectedIngredients.length === 0 && !basePrompt}
    <div class="placeholder">
      <p>Посмотри, какие продукты есть?</p>
    </div>
  {:else if isLoading}
    <div class="placeholder">
      <div class="spinner"></div>
      <p>Подбираю лучший рецепт...</p>
    </div>
  {:else if error}
    <div class="placeholder">
      <div class="error-icon">⚠️</div>
      <h3>Что-то пошло не так</h3>
      <p>{error}</p>
      <button
        onclick={() => loadRecipes({ basePrompt, selectedIngredients })}
        class="retry-button"
      >
        Попробовать снова
      </button>
    </div>
  {:else if !recipes || !recipes.length}
    <div class="placeholder">
      <p>Из этого каши не сваришь!</p>
      <p>Может, найдется еще что-нибудь?</p>
    </div>
  {:else if Array.isArray(recipes)}
    {#each recipes as recipe}
      <div class="recipe-card">
        {#if "text" in recipe}
          {recipe.text}
        {:else if "url" in recipe}
          <a href={recipe.url}>{recipe.title}</a>
        {:else}
          <h3>{recipe.title}</h3>
          <div class="recipe-ingredients">
            <strong>Вам понадобится:</strong>
            {recipe.ingredients.map((i) => i.name).join(", ")}
          </div>
          <div class="recipe-instructions">
            <strong>Как готовить:</strong>
            {recipe.directions}
          </div>
        {/if}
      </div>
    {/each}
  {/if}
</div>

<style>
  .recipes-section {
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .placeholder {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 20px;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .error-icon {
    font-size: 2.5em;
    margin-bottom: 10px;
  }

  .recipe-card h3 {
    margin: 0 0 15px 0;
    color: #495057;
    font-size: 1.3rem;
  }

  .recipe-ingredients,
  .recipe-instructions {
    margin-bottom: 10px;
    line-height: 1.5;
  }

  .recipe-ingredients strong,
  .recipe-instructions strong {
    color: #667eea;
  }

  /* Animation */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
