<script setup>
import { ref, defineProps } from 'vue'
import { FwbModal } from 'flowbite-vue'
import NoteButton from './NoteButton.vue'

const props = defineProps({
  hideButton: {
    type: Boolean,
    default: false,
  },
  openButtonText: {
    type: String,
    default: '確認',
  },
  modalHeader: {
    type: String,
    default: '請確認',
  },
  modalBody: {
    type: String,
    default: '',
  },
  onConfirm: Function,
})

const isShowModal = ref(false)

const closeModal = () => {
  isShowModal.value = false
}
const showModal = () => {
  isShowModal.value = true
}
const confirm = () => {
  props.onConfirm()
  closeModal()
}
</script>

<template>
  <NoteButton v-show="hideButton" @click="showModal"> {{ openButtonText }} </NoteButton>

  <fwb-modal v-if="isShowModal" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg">{{ modalHeader }}</div>
    </template>
    <template #body>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">{{ modalBody }}</p>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <NoteButton @click="closeModal"> 取消 </NoteButton>
        <NoteButton @click="confirm"> 確認 </NoteButton>
      </div>
    </template>
  </fwb-modal>
</template>
