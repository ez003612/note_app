<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { noteStores } from '../../stores/noteStores'
import NoteButton from '../ui/NoteButton.vue'
import PopUpModal from '../ui/PopUpModal.vue'

const noteData = noteStores()
const { addNote, editNote, removeNote } = noteStores()

const route = useRoute()
const router = useRouter()
const currentNote = computed(() => noteData.notes.find((note) => note.id === parseInt(route.params.id)))

const newTitle = ref(currentNote?.value ? currentNote.value.title : '')
const newContent = ref(currentNote?.value ? currentNote.value.content : '')
const error = ref(false)
const infoText = ref('')
const note_id = ref(currentNote?.value ? currentNote.value.id : '')

// 更新資料
watch(currentNote, (newNote) => {
  if (newNote) {
    newTitle.value = newNote.title
    newContent.value = newNote.content
  } else {
    newTitle.value = ''
    newContent.value = ''
  }
})

const onSubmit = () => {
  error.value = false
  infoText.value = ''

  if (!newTitle.value || !newContent.value) {
    error.value = true
    infoText.value = '請輸入標題及筆記內容'
    return
  }

  if (currentNote.value) {
    // 更新筆記
    editNote(currentNote.value.id, newTitle.value, newContent.value)
    infoText.value = '更新成功'
  } else {
    // 新增筆記
    addNote(newTitle.value, newContent.value)
    newTitle.value = ''
    newContent.value = ''
    infoText.value = '新增成功'
  }

  setTimeout(() => {
    infoText.value = ''
  }, 3000)
}

const remove = () => {
  removeNote(note_id.value)
  router.push('/note_app/')
}
</script>

<template>
  <form class="container" @submit.prevent="onSubmit">
    <div class="flex justify-start items-center gap-3">
      <NoteButton @click="router.go(-1)"><i class="fa-solid fa-caret-left"></i></NoteButton>
      <h2 class="my-5">新增筆記</h2>
    </div>
    <div class="mb-3">
      <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">標題</label>
      <input
        v-model="newTitle"
        type="text"
        name="price"
        id="title"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="請輸入標題"
      />
    </div>
    <div class="mb-3">
      <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">筆記內容</label>
      <textarea
        v-model="newContent"
        id="content"
        rows="15"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="請輸入筆記內容"
      ></textarea>
    </div>
    <div class="flex justify-between items-center">
      <div>
        <span
          :class="[
            infoText ? 'opacity-100' : 'opacity-0',
            error ? 'bg-rose-300 dark:bg-rose-700' : 'bg-green-300 dark:bg-green-700',
            'transition',
            'p-5',
            'rounded',
          ]"
          >{{ infoText }}</span
        >
      </div>

      <div class="flex justify-between items-center gap-2">
        <PopUpModal
          :hideButton="currentNote ? true : false"
          openButtonText="刪除"
          modalHeader="請問確定要刪除嗎？"
          :modalBody="`確定要刪除 ${newTitle} 這篇文章嗎？ \n 刪除後無法復原喔！`"
          :onConfirm="remove"
        />
        <NoteButton type="submit">{{ currentNote ? '更新' : '新增' }}</NoteButton>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
