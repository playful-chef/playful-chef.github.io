<script lang="ts">
  import { getRecipe } from "./getRecipe";

    type Props = { selectedIngredients: string[] };

    let { selectedIngredients }: Props = $props();
</script>

<div class="recipes-section">
    {#if selectedIngredients.length === 0}
        <div class="placeholder">
            <p>First, tell me what ingredients you have</p>
        </div>
    {:else}
        {#await getRecipe(selectedIngredients) then recipes}
            {#if !recipes || !recipes.length}
                <div class="placeholder">
                    <p>We're going to need something else to cook!</p>
                    <p>See if you have something else aroun the house?</p>
                </div>
            {:else}
                <h2>Now we're cooking! Here's what you can make with {selectedIngredients.join(', ')}:</h2>
                {#each recipes as recipe}
                    <div class="recipe-card">
                        <h3>{recipe.title}</h3>
                        <div class="recipe-ingredients">
                            <strong>Ingredients:</strong>
                            {recipe.ingredients.map(i => i.name).join(', ')}
                        </div>
                        <div class="recipe-instructions">
                            <strong>Instructions:</strong>
                            {recipe.directions}
                        </div>
                    </div>
                {/each}
            {/if}
        {/await}
    {/if}
</div>

<style>
    h2 {
        margin: 0;
    }

    .recipes-section {
        overflow: auto;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .placeholder {
        margin: auto;
        text-align: center;
        padding: 60px 20px;
    }

    .recipe-card {
        border: 2px solid #e1e5e9;
        border-radius: 15px;
        padding: 20px;
        background: #f8f9fa;
        transition: all 0.3s ease;
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
</style>
