# React Project - DevTinder(Frontend)

## Basic Starting of React Project

- Create (build tool) Vite + React project => npm create vite@latest
- install all the dependency => npm i
- start the project => npm run dev
- app.jsx => remove unnecessary rendering data(default -given by vite)
- Delete App.css file & assets folder

- Install Tailwind CSS => npm install tailwindcss @tailwindcss/vite
- Configure the Vite plugin =>
  import { defineConfig } from 'vite'
  import tailwindcss from '@tailwindcss/vite'
  export default defineConfig({
  plugins: [
  tailwindcss(),
  ],
  })
