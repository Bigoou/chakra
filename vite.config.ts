import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import glsl from 'vite-plugin-glsl';
import glslify from 'vite-plugin-glslify'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), glslify()],
})
