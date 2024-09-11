<script setup>
import 'flowbite'
import { reactive, computed, onMounted } from 'vue'
import { noteStores } from './stores/noteStores'
import { themeStore } from './stores/themeStore'
import Navbar from './components/layout/Navbar.vue'
import NoteList from './components/layout/NoteList.vue'
import AddNoteButton from './components/ui/AddNoteButton.vue'

const themeData = themeStore()
const { initializeTheme } = themeStore()

const noteData = noteStores()
const noteListPinnedProps = reactive({ class: 'basis-1/5 translate-x-0' })
const noteListUnpinnedProps = reactive({
  class:
    'fixed bottom-0 left-0 z-40 bg-white mx-auto overflow-y-auto transition-transform w-full h-72 translate-y-60 sm:top-0 sm:translate-y-0 sm:-translate-x-60 sm:w-72 sm:h-screen hover:translate-y-0 hover:sm:translate-x-0  dark:bg-gray-800',
})
const computedProps = computed(() => (noteData.settings.noteListPinned ? noteListPinnedProps : noteListUnpinnedProps))

onMounted(() => {
  initializeTheme()
})
</script>

<template>
  <main class="max-w-screen-xl w-4/5 mx-auto bg-white dark:bg-gray-900 relative">
    <Navbar />
    <div class="flex flex-row gap-10">
      <div v-bind="computedProps">
        <NoteList />
      </div>
      <div :class="noteData.settings.noteListPinned ? 'basis-4/5' : 'basis-full'"><router-view /></div>
    </div>
    <AddNoteButton />
  </main>
</template>

<style scoped></style>
