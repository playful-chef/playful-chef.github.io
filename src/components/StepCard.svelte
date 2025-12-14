<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    stepNumber,
    title,
    isActive,
    isCompleted,
    isExpanded,
    onHeaderClick,
    children,
  }: {
    stepNumber: number;
    title: string;
    isActive: boolean;
    isCompleted: boolean;
    isExpanded: boolean;
    onHeaderClick: () => void;
    children: Snippet;
  } = $props();
</script>

<div class="step-card" class:active={isActive} class:completed={isCompleted}>
  <div class="step-header" on:click={onHeaderClick}>
    <div class="step-header-left">
      <div class="step-status">
        <div class="step-number-circle">{stepNumber}</div>
      </div>
      <div class="step-title">{title}</div>
    </div>
  </div>

  {#if isExpanded}
    <div class="step-content">
      {@render children()}
    </div>
  {/if}
</div>

<style>
  .step-card {
    background: white;
    border: 2px solid #e0e0e0;
    border-radius: 15px;
    transition: all 0.3s ease;
  }

  .step-card.active {
    border-color: #2196f3;
    box-shadow: 0 5px 15px rgba(33, 150, 243, 0.1);
  }

  .step-card.completed {
    border-color: #4caf50;
  }

  .step-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    cursor: pointer;
    user-select: none;
  }

  .step-header-left {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .step-status {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .step-number-circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #2196f3;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  .step-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
  }

  .step-content {
    padding: 30px;
  }

  @media (max-width: 768px) {
    .step-header {
      padding: 15px;
    }

    .step-content {
      padding: 20px;
    }
  }
</style>
