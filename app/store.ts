import { writable } from 'svelte/store';

export const userStore = writable<ChatUser | null>(null)

export const messagesStore = writable<ChatMessage[]>([])