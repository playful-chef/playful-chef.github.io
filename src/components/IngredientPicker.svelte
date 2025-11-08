<script lang="ts">
    import { availableIngredients } from "./ingredients";
    
    type Props = { selectedIngredients: string[] };
    let { selectedIngredients = $bindable([]) }: Props = $props();
    
    let searchTerm = $state('');

    function toggleIngredient(ingredient: string) {
        if (selectedIngredients.includes(ingredient)) {
            selectedIngredients = selectedIngredients.filter(i => i !== ingredient);
        } else {
            selectedIngredients = [...selectedIngredients, ingredient];
        }
        searchTerm = ''
    }

    function resetSearch() {
        searchTerm = '';
        selectedIngredients = [];
    }

    let filteredIngredients = $derived(availableIngredients.filter(ingredient =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    ));
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

    <div class="available-ingredients">
        {#each filteredIngredients as ingredient}
            <button 
                class="chip {selectedIngredients.includes(ingredient) ? 'selected' : 'available'}" 
                onclick={() => toggleIngredient(ingredient)}
            >
                {ingredient}
                {#if selectedIngredients.includes(ingredient)}
                    <span class="remove">×</span>
                {/if}
            </button>
        {/each}
        {#if filteredIngredients.length === 0 && searchTerm}
            <p class="no-results">I don't think these's an ingredient called "{searchTerm}"</p>
        {/if}
    </div>
</div>

<style>
    .search-section {
        display: flex;
        flex-direction: column;
        gap: 20px;
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
</style>