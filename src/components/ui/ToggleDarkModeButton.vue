<script setup>
import { themeStore } from '../../stores/themeStore'
import NoteButton from './NoteButton.vue'
const themeData = themeStore()
const { toggleDarkMode } = themeStore()
</script>

<template>
  <NoteButton @click="toggleDarkMode">
    <i v-if="themeData.darkMode" class="fa-regular fa-sun"></i>
    <i v-else class="fa-regular fa-moon"></i>
  </NoteButton>
</template>

<style scoped></style>
