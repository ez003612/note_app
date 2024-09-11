<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <button
    @click="() => router.push('/note_app/add_note')"
    type="button"
    class="w-16 h-16 fixed bottom-16 right-8 sm:right-16 z-10 sm:z-50 rounded-full transition bg-sky-300 dark:bg-sky-700 text-gray-600 dark:text-white shadow-md active:shadow-inner shadow-sky-700/50 active:shadow-sky-700/50 dark:shadow-sky-950/50 dark:active:shadow-sky-950/50"
  >
    <i class="text-2xl fa-solid fa-plus"></i>
  </button>
</template>

<style scoped></style>
