import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  manifest_version: 3,
  name: 'Linkedin++',
  description: 'A simple Chrome extension using Vite + React + CRXJS',
  version: '1.0.0',
  action: {
    default_popup: 'index.html',
    default_icon: {
      '128': 'icon.png',
    },
  },
  icons: {
    '128': 'icon.png',
  },
  permissions: ["scripting", "tabs"],
})
