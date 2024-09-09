<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  customClass: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  onClick: Function,
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    @click="onClick"
    :class="[
      'bg-gray-900 dark:bg-white text-white dark:text-gray-900',
      'py-2 px-4 rounded-lg transition-colors duration-300',
      customClass,
      { 'opacity-50 cursor-not-allowed': disabled },
    ]"
  >
    <slot></slot>
  </button>
</template>

<style scoped></style>
