import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: './openapi.json', // FastAPI: http://localhost:8000/openapi.json
  output: 'src/api/generated',
  plugins: ['@hey-api/typescript', '@hey-api/sdk', 'zod'],
})
