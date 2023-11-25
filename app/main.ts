import App from './App.svelte'
import {userStore, messagesStore} from './store.js'

userStore.subscribe((res) => {
  if (res) {
    localStorage.setItem('chat-user', JSON.stringify(res))
  }
})

try {
  userStore.set(JSON.parse(localStorage.getItem('chat-user') || ''))
} catch (e) {}

fetch(`${location.href}history`)
  .then(res => res.json())
  .then(messages => messages.map((m: string) => JSON.parse(m)))
  .then(messages => messagesStore.set(messages))

const app = new App({
  target: document.getElementById('root')!,
})

export default app