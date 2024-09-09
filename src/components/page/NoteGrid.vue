<script setup>
import { noteStores } from '../../stores/noteStores'
import NoteCard from '../ui/NoteCard.vue'

const noteData = noteStores()
const { togglePinned, removeNote } = noteStores()
</script>

<template>
  <div class="container">
    <h2 class="my-5 text-gray-900 dark:text-white">{{ noteData.settings.searchQuery ? '搜尋結果：' : '全部筆記' }}</h2>
    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NoteCard
        v-for="note in noteData.filteredNotes"
        :key="note.id"
        :note="note"
        @togglePinned="togglePinned(note.id)"
        @removeNote="removeNote(note.id)"
      />
    </div>
  </div>
</template>

<style scoped></style>
