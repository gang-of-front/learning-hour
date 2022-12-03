import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ['2022/**/*.{js,ts}'],
  },
})
