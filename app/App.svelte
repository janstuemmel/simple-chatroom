<script lang="ts">
  import Modal from './Modal.svelte';
  import { userStore, messagesStore } from './store.js';
  import { uuidv4 } from './util';
  import { afterUpdate } from 'svelte';
  import Bubble from './Bubble.svelte';

  let chatElem: HTMLDivElement
  let chatInputValue = ''

  $: chatInputRows = chatInputValue.split('\n').length
  afterUpdate(() => chatElem.scrollTo(0, chatElem.scrollHeight))

  const ws = new WebSocket(`ws://${location.host}/ws`)

  const onMessage = (messageEvent: MessageEvent<string>) => {
    $messagesStore = [...$messagesStore, JSON.parse(messageEvent.data) as ChatMessage]
  }

  ws.addEventListener('message', onMessage)

  const sendMessage = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault()
      if (chatInputValue.trim() !== '' && $userStore) {
        ws.send(JSON.stringify({User: $userStore, Id: uuidv4(), Text: chatInputValue, Date: new Date } as ChatMessage))
        chatInputValue = ''
      }
    }
  }

  let registerUserInputValue = ''

  const registerUser = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      userStore.set({Id: uuidv4(), Name: registerUserInputValue})
    }
  }
</script>

<Modal show={!$userStore}>
  <input 
    bind:value={registerUserInputValue} 
    on:keydown={registerUser}
    type="text"
    class="w-full p-2 bg-nord-1 rounded-md focus:outline-none font-mono tracking-wider" 
    placeholder="Enter username..." />
</Modal>

<div class="flex flex-col w-screen h-screen bg-nord-4 dark:bg-nord-0 text-nord-0 dark:text-nord-6 tracking-wider">
  <div bind:this={chatElem} class="flex-1 flex flex-col gap-2 p-4 overflow-y-scroll">
    {#each $messagesStore as message, idx}
      <Bubble 
        name={message.User.Name}
        subsequent={message.User.Name === $messagesStore[idx-1]?.User?.Name}
        message={message.Text}
        highlighted={message.User.Id === $userStore?.Id} />
    {/each}
  </div>
  <div class="flex items-center">
    <textarea
      bind:value={chatInputValue}
      on:keydown={sendMessage}
      rows={chatInputRows < 10 ? chatInputRows : 10}
      spellcheck="false"
      placeholder="Send with CTRL-Enter..."
      style:resize="none"
      class="m-4 p-3 w-full shadow-sm bg-nord-6 dark:bg-nord-2 rounded-md focus:outline-none tracking-wider font-mono text-sm" />
  </div>
</div>
