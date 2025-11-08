<script>
  import { getRecipe } from "./getRecipe";
  import IngredientPicker from "./IngredientPicker.svelte";
  import Recipe from "./Recipe.svelte";

    let selectedIngredients = [];
</script>

<div class="app">
    <header class="header">
        <h1>Веселый колпачок</h1>
    </header>

    <main class="main">
        <IngredientPicker bind:selectedIngredients />
        <Recipe {selectedIngredients} />
    </main>
</div>

<style>
    .app {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        height: 100vh;
        box-sizing: border-box;
    }

    .header {
        text-align: center;
        margin-bottom: 40px;
        color: white;
    }

    .header h1 {
        font-size: 3rem;
        margin: 0 0 10px 0;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .main {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        background: white;
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    @media (max-width: 768px) {
        .main {
            grid-template-columns: 1fr;
            gap: 30px;
        }

        .header h1 {
            font-size: 2.2rem;
        }

        .app {
            padding: 15px;
        }
    }
</style>
