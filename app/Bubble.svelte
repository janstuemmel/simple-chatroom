<script lang="ts">
  import { marked } from 'marked';
  export let message: string
  export let name: string
  export let highlighted = false
  export let subsequent = false
</script>

<div
  class:self-end={highlighted}
  class:self-start={!highlighted}
  class="flex flex-col">
  {#if !subsequent}
  <div 
    class:text-right={highlighted}
    class="text-gray-500 font-semibold font-mono tracking-wider text-xs mb-1">
    {name}
  </div>
  {/if}
  <div 
    class:dark:bg-nord-10={highlighted}
    class:dark:bg-nord-2={!highlighted}
    class:bg-nord-7={highlighted}
    class:bg-nord-6={!highlighted}
    class="inline-block p-2 rounded-md text-sm text-left max-w-[700px] break-all prose dark:prose-invert shadow-sm">
    {@html marked.parse(message, {breaks: true})}
  </div>
</div>
