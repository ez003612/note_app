<script setup>
import 'flowbite'
import { noteStores } from '../../stores/noteStores'
import ListItem from '../ui/ListItem.vue'
import NoteButton from '../ui/NoteButton.vue'

const noteData = noteStores()
const { toggleListPinned, removeNote, togglePinned } = noteStores()
</script>

<template>
  <section class="flex">
    <div class="flex flex-col gap-3 w-60 p-2">
      <div class="flex items-center justify-between">
        <h2 class="m-5">Menu</h2>
        <NoteButton @click="toggleListPinned">
          <i :class="['fa-solid', 'fa-thumbtack', { 'rotate-45': !noteData.settings.noteListPinned }]"></i>
        </NoteButton>
      </div>
      <!-- list -->
      <div
        id="accordion-flush"
        data-accordion="open"
        data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        data-inactive-classes="text-gray-500 dark:text-gray-400"
      >
        <h2 v-show="noteData.pinnedNotes.length" id="accordion-flush-heading-1">
          <button
            type="button"
            class="flex items-center justify-between w-full p-2 font-medium rtl:text-right text-gray-500 dark:border-gray-700 dark:text-gray-400 gap-3"
            data-accordion-target="#accordion-flush-body-1"
            aria-expanded="true"
            aria-controls="accordion-flush-body-1"
          >
            <p><i class="fa-solid fa-book"></i> 重要</p>
            <i data-accordion-icon class="fa-solid fa-chevron-down transition"></i>
          </button>
        </h2>
        <div id="accordion-flush-body-1" class="hidden" aria-labelledby="accordion-flush-heading-1">
          <ul class="ps-3 max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            <ListItem
              v-for="note in noteData.pinnedNotes"
              :key="note.id"
              :note="note"
              @togglePinned="togglePinned(note.id)"
              @removeNote="removeNote(note.id)"
            />
          </ul>
        </div>

        <h2 v-show="noteData.unPinnedNotes.length" id="accordion-flush-heading-2">
          <button
            type="button"
            class="flex items-center justify-between w-full p-2 font-medium rtl:text-right text-gray-500 dark:border-gray-700 dark:text-gray-400 gap-3"
            data-accordion-target="#accordion-flush-body-2"
            aria-expanded="true"
            aria-controls="accordion-flush-body-2"
          >
            <p><i class="fa-solid fa-book"></i> 其他</p>
            <i data-accordion-icon class="fa-solid fa-chevron-down transition"></i>
          </button>
        </h2>
        <div id="accordion-flush-body-2" class="hidden" aria-labelledby="accordion-flush-heading-2">
          <ul class="ps-3 max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            <ListItem
              v-for="note in noteData.unPinnedNotes"
              :key="note.id"
              :note="note"
              @togglePinned="togglePinned(note.id)"
              @removeNote="removeNote(note.id)"
            />
          </ul>
        </div>
      </div>
    </div>
    <div
      v-show="!noteData.settings.noteListPinned"
      class="w-12 h-screen bg-sky-300 dark:bg-sky-700 flex flex-col items-center text-4xl py-8 gap-4"
    >
      <!-- <i class="fa-solid fa-bars"></i> -->
    </div>
  </section>
</template>

<style scoped></style>
