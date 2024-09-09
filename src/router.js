import { createRouter, createWebHistory } from 'vue-router'
import NoteGrid from './components/page/NoteGrid.vue'
import WriteNote from './components/page/WriteNote.vue'
// import SearchNote from './components/SearchNote.vue'

export const routes = [
  { path: '/', pathName: 'note_grid', name: '首頁', component: NoteGrid },
  { path: '/add_note', pathName: 'add_note', name: '新增', component: WriteNote },
  { path: '/edit_note/:id', pathName: 'edit_note', name: '編輯', props: true, component: WriteNote },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
