import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'
import { createContactHandler } from './server/contact.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const contact = createContactHandler({
    env: {
      RESEND_API_KEY: env.RESEND_API_KEY,
      CONTACT_FROM: env.CONTACT_FROM,
    },
  })
  const configureContact = (server) => {
    server.middlewares.use((request, response, next) => {
      if (request.url?.split('?')[0] !== '/api/contact') return next()
      contact(request, response).catch(next)
    })
  }
  return {
    plugins: [
      react(),
      {
        name: 'portfolio-contact-api',
        configureServer: configureContact,
        configurePreviewServer: configureContact,
      },
    ],
  }
})
