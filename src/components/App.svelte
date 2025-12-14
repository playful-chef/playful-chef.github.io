<script lang="ts">
  import StepCard from "./StepCard.svelte";
  import IngredientPicker from "./IngredientPicker.svelte";
  import Prompt from "./Prompt.svelte";
  import Recipe from "./Recipe.svelte";

  let basePrompt = "";
  let selectedIngredients: string[] = [];
  let currentStep = 1;

  function goToStep(step: number) {
    currentStep = step;
  }

  function nextStep() {
    if (currentStep < 3) {
      currentStep++;
    }
  }

  // Check if step is expanded based on currentStep
  $: isStep1Expanded = currentStep === 1;
  $: isStep2Expanded = currentStep === 2;
  $: isStep3Expanded = currentStep === 3;
</script>

<div class="app">
  <main class="wizard-container">
    <!-- Step 1: Base Prompt -->
    <StepCard
      stepNumber={1}
      title={currentStep === 1 || !basePrompt
        ? "Чего хочется поесть?"
        : basePrompt}
      isActive={currentStep === 1}
      isCompleted={currentStep > 1}
      isExpanded={isStep1Expanded}
      onHeaderClick={() => goToStep(1)}
    >
      <Prompt bind:query={basePrompt} />
      <div class="step-actions">
        <button class="btn-next" on:click={nextStep}> Выбрать продукты </button>
      </div>
    </StepCard>

    <!-- Step 2: Ingredients -->
    <StepCard
      stepNumber={2}
      title={currentStep === 2 || !selectedIngredients.length
        ? "Какие есть продукты?"
        : selectedIngredients.join(", ")}
      isActive={currentStep === 2}
      isCompleted={currentStep > 2}
      isExpanded={isStep2Expanded}
      onHeaderClick={() => goToStep(2)}
    >
      <IngredientPicker bind:selectedIngredients />
      <div class="step-actions">
        <button class="btn-next" on:click={nextStep}> Получить рецепт </button>
      </div>
    </StepCard>

    <!-- Step 3: Recipe -->
    <StepCard
      stepNumber={3}
      title="Рецепт для тебя"
      isActive={currentStep === 3}
      isCompleted={false}
      isExpanded={isStep3Expanded}
      onHeaderClick={() => goToStep(3)}
    >
      <Recipe {basePrompt} {selectedIngredients} />
    </StepCard>
  </main>
</div>

<style>
  .app {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .wizard-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
  }

  .step-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  .btn-next {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-next {
    background: #2196f3;
    color: white;
  }

  .btn-next:hover:not(:disabled) {
    background: #1976d2;
    transform: translateX(2px);
  }

  .btn-next:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    .app {
      padding: 15px;
    }

    .step-actions {
      flex-direction: column;
      gap: 10px;
    }

    .btn-next {
      width: 100%;
    }
  }
</style>
