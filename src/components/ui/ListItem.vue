<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  note: Object,
})
const emit = defineEmits(['togglePinned', 'removeNote'])

const togglePinned = () => {
  emit('togglePinned', props.note.id)
}
const removeNote = () => {
  emit('removeNote', props.note.id)
}
</script>

<template>
  <li class="flex justify-between items-center py-2 sm:py-3 w-full">
    <span class="max-w-40 truncate">
      <router-link :to="`/note_app/edit_note/${note.id}`">{{ note.title }}</router-link>
    </span>
    <div class="inline-flex" role="group">
      <button @click="togglePinned(note.id)" class="w-9 h-9 bg-transparent hover:bg-gray-400 transition">
        <i
          :class="['fa-solid', 'fa-thumbtack', 'text-gray-900', 'dark:text-white', { 'rotate-45': !note.isPinned }]"
        ></i>
      </button>
      <button @click="removeNote(note.id)" class="w-9 h-9 bg-transparent hover:bg-gray-400 transition">
        <i class="fa-solid fa-trash-can text-gray-900 dark:text-white"></i>
      </button>
    </div>
  </li>
</template>

<style scoped>
button {
  padding: 5px;
  background-color: transparent;
  color: #222222;
}
/* button:hover {
  border: 1px solid transparent;
} */
</style>
