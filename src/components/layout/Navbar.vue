<script setup>
import 'flowbite'
import { ref, onMounted } from 'vue'
import { noteStores } from '../../stores/noteStores.js'
import ToggleDarkModeButton from '../ui/ToggleDarkModeButton.vue'

const noteData = noteStores()
const { searchNotes } = noteStores()
const searchQuery = ref('')

onMounted(() => {
  searchQuery.value = noteData.settings.searchQuery
})

const CancelSearch = () => {
  searchQuery.value = ''
  searchNotes('')
}
</script>

<template>
  <header>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <router-link to="/note_app/">
          <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="../../assets/note_logo.png" class="h-8 rounded" alt="首頁" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Home</span>
          </div>
        </router-link>

        <div class="flex md:order-2 gap-3">
          <!-- PC search -->
          <div class="relative hidden md:block">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <i class="w-4 h-4 text-gray-500 dark:text-gray-400 fa-solid fa-magnifying-glass"></i>
              <span class="sr-only">Search icon</span>
            </div>
            <div
              v-show="searchQuery"
              @click="CancelSearch"
              class="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
            >
              <i class="h-4 text-gray-500 dark:text-gray-400 fa-solid fa-xmark"></i>
              <span class="sr-only">Cancel icon</span>
            </div>
            <input
              v-model="searchQuery"
              @input="searchNotes(searchQuery)"
              type="text"
              id="search-navbar"
              class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
          <!-- darkMode button -->
          <ToggleDarkModeButton />
          <!-- mobile menu button -->
          <button
            data-collapse-toggle="navbar-search"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <!-- mobile menu list -->
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
          <div class="relative mt-3 md:hidden">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <i class="w-4 h-4 text-gray-500 dark:text-gray-400 fa-solid fa-magnifying-glass"></i>
            </div>
            <div
              v-show="searchQuery"
              @click="CancelSearch"
              class="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
            >
              <i class="h-4 text-gray-500 dark:text-gray-400 fa-solid fa-xmark"></i>
              <span class="sr-only">Cancel icon</span>
            </div>
            <input
              v-model="searchQuery"
              @input="searchNotes(searchQuery)"
              type="text"
              id="search-navbar"
              class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
          <!-- <ul
            class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li v-show="!noteData.settings.noteListPinned">

            </li>
          </ul> -->
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.logo {
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 1em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 1em #42b883aa);
}
</style>
