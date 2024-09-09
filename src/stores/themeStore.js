import { defineStore } from 'pinia'

export const themeStore = defineStore('theme', {
  state: () => ({
    darkMode: false,
  }),
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      this.updateTheme()
    },
    updateTheme() {
      localStorage.setItem('dark_mode', JSON.stringify(this.darkMode))
      if (this.darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    initializeTheme() {
      const savedTheme = localStorage.getItem('dark_mode')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      if (savedTheme !== null) {
        this.darkMode = JSON.parse(savedTheme)
      } else {
        this.darkMode = prefersDark
      }

      this.updateTheme()

      // Listen for changes in system preferences
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem('dark_mode') === null) {
          this.darkMode = e.matches
          this.updateTheme()
        }
      })
    },
  },
})
