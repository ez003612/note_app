<script setup>
import { defineProps, defineEmits } from 'vue'
import NoteButton from './NoteButton.vue'
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
  <router-link :to="`/edit_note/${note.id}`">
    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="flex justify-between items-center">
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">
          {{ note.title }}
        </h5>
        <div class="inline-flex rounded-md shadow-sm gap-2" role="group">
          <NoteButton @click.prevent="togglePinned(note.id)">
            <i :class="['fa-solid', 'fa-thumbtack', { 'rotate-45': !note.isPinned }]"></i>
          </NoteButton>
          <NoteButton @click.prevent="removeNote(note.id)">
            <i class="fa-solid fa-trash-can"></i>
          </NoteButton>
        </div>
      </div>

      <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">{{ note.content }}</p>
    </div>
  </router-link>
</template>

<style scoped></style>
