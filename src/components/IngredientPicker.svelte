<script lang="ts">
    import { loadIngredients, type Ingredient } from './ingredients';
    
    type Props = { selectedIngredients: string[] };
    let { selectedIngredients = $bindable([]) }: Props = $props();
    
    let searchTerm = $state('');

    // Store the promise for the await block
    let ingredientsPromise = $state(loadIngredients());

    function retryLoad() {
        ingredientsPromise = loadIngredients();
    }

    function toggleIngredient(ingredientName: string) {
        if (selectedIngredients.includes(ingredientName)) {
            selectedIngredients = selectedIngredients.filter(i => i !== ingredientName);
        } else {
            selectedIngredients = [...selectedIngredients, ingredientName];
        }
        searchTerm = ''
    }

    function resetSearch() {
        searchTerm = '';
        selectedIngredients = [];
    }

    function filterIngredients(ingredients: Ingredient[], searchTerm: string) {
        return ingredients.filter(ingredient =>
            ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).toSorted((a, b) => Number(selectedIngredients.includes(b.name)) - Number(selectedIngredients.includes(a.name)))
    }
</script>

<div class="search-section">
    <div class="search-container">
        <input
            type="text"
            placeholder="Search ingredients..."
            bind:value={searchTerm}
            class="search-input"
        />
        {#if selectedIngredients.length}
            <button class="reset-button" onclick={resetSearch} type="button">
                Reset all
            </button>
        {/if}
    </div>

    {#await ingredientsPromise}
        <div class="loading">Loading ingredients...</div>
    {:then availableIngredients}
        <div class="available-ingredients">
            {#each filterIngredients(availableIngredients, searchTerm) as ingredient}
                <button 
                    class="chip {selectedIngredients.includes(ingredient.name) ? 'selected' : 'available'}" 
                    onclick={() => toggleIngredient(ingredient.name)}
                >
                    {ingredient.name}
                    {#if selectedIngredients.includes(ingredient.name)}
                        <span class="remove">×</span>
                    {/if}
                </button>
            {/each}
            {#if filterIngredients(availableIngredients, searchTerm).length === 0 && searchTerm}
                <p class="no-results">I don't think there's an ingredient called "{searchTerm}"</p>
            {/if}
        </div>
    {:catch error}
        <div class="error">
            <p>Error loading ingredients: {error.message}</p>
            <button onclick={retryLoad} class="retry-button">Retry</button>
        </div>
    {/await}
</div>

<style>
    .search-section {
        display: grid;
        grid-template-rows: max-content 1fr;
        gap: 20px;
        overflow: hidden;
    }

    .search-container {
        display: flex;
        font-size: 1.2rem;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        overflow: hidden;
    }

    .search-input {
        padding: 15px 20px;
        outline: none;
        transition: all 0.3s ease;
        width: 100%;
        padding-right: 45px;
        border: none;
    }

    .search-input:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .reset-button {
        border: none;
        white-space: nowrap;
        padding: 0 16px;
        background: #f8f9fa;
    }

    .reset-button:hover {
        background: #e9ecef;
    }

    .available-ingredients {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        overflow-y: auto;
    }

    .chip {
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        user-select: none;
        display: flex;
        align-items: center;
        gap: 8px;
        border: 1px solid #dee2e6;
        background: #f8f9fa;
        color: #495057;
    }
    
    .chip:hover {
        background: #e9ecef;
    }

    .chip.selected {
        background: #667eea;
        color: white;
    }

    .chip.selected:hover {
        background: #5a6fd8;
    }

    .remove {
        font-size: 1.2rem;
        font-weight: bold;
        line-height: 1;
    }

    .no-results {
        text-align: center;
        color: #6c757d;
        font-style: italic;
        width: 100%;
        margin: 0;
    }

    .loading {
        text-align: center;
        color: #6c757d;
        padding: 20px;
    }

    .error {
        text-align: center;
        color: #dc3545;
        padding: 20px;
        border: 1px solid #f5c6cb;
        border-radius: 8px;
        background: #f8d7da;
    }

    .retry-button {
        margin-top: 10px;
        padding: 8px 16px;
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .retry-button:hover {
        background: #c82333;
    }
</style>