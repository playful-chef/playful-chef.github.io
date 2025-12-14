<script lang="ts">
  type Props = { query: string };
  let { query = $bindable("") }: Props = $props();
</script>

<div class="search-container">
  <input
    type="text"
    placeholder="Что хотите приготовить?"
    bind:value={query}
    class="search-input"
  />
</div>

<style>
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
</style>
