import { defineStore } from 'pinia'

// 輔助函式：儲存筆記到 localStorage
const saveNotesToLocalStorage = (notes) => {
  localStorage.setItem('my_notes', JSON.stringify(notes))
}

// 輔助函式：從 localStorage 讀取筆記
const loadNotesFromLocalStorage = () => {
  const savedNotes = localStorage.getItem('my_notes')
  return savedNotes ? JSON.parse(savedNotes) : []
}

const loadSettingsFromLocalStorage = () => {
  const savedSettings = localStorage.getItem('note_settings')
  return savedSettings
    ? JSON.parse(savedSettings)
    : {
        searchQuery: '',
        noteListPinned: false,
      }
}

export const noteStores = defineStore('lists', {
  state: () => ({
    // 儲存 state 的各個變數
    notes: loadNotesFromLocalStorage(),
    settings: loadSettingsFromLocalStorage(),
  }),
  getters: {
    // 需要被讀取的資料函式
    pinnedNotes: (state) => state.notes.filter((note) => note.isPinned),
    unPinnedNotes: (state) => state.notes.filter((note) => !note.isPinned),
    filteredNotes: (state) => {
      const query = state.settings.searchQuery?.toLowerCase()
      const filteredNotes = state.notes.filter(
        (note) => note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query)
      )
      const result = filteredNotes.sort((a, b) => {
        return b.isPinned - a.isPinned
      })
      return result
    },
  },
  actions: {
    // 變更資料狀態的函式區
    toggleListPinned() {
      this.settings.noteListPinned = !this.settings.noteListPinned
      localStorage.setItem('note_settings', JSON.stringify(this.settings))
    },
    addNote(title, content) {
      if (!title || !content) return
      const last_id = this.notes[this.notes.length - 1]?.id || 0
      this.notes.push({
        id: last_id + 1,
        title,
        content,
        isPinned: false,
      })
      saveNotesToLocalStorage(this.notes)
    },
    removeNote(id) {
      const index = this.notes.findIndex((note) => note.id === id)
      if (index === -1) return
      this.notes.splice(index, 1)
      saveNotesToLocalStorage(this.notes)
    },
    togglePinned(id) {
      const index = this.notes.findIndex((note) => note.id === id)
      if (index === -1) return
      this.notes[index].isPinned = !this.notes[index].isPinned
      saveNotesToLocalStorage(this.notes)
    },
    editNote(id, title, content) {
      const index = this.notes.findIndex((note) => note.id === id)
      if (index === -1) return
      this.notes[index].title = title
      this.notes[index].content = content
      saveNotesToLocalStorage(this.notes)
    },
    searchNotes(query) {
      this.settings.searchQuery = query
      localStorage.setItem('note_settings', JSON.stringify(this.settings))
    },
  },
})
