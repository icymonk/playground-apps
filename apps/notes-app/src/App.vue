<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
import Editor from './components/Editor.vue'
</script>

<template>
  <div class="flex h-screen w-full bg-neutral-900 overflow-hidden font-sans">
    <Sidebar class="shrink-0" />
    <Editor class="flex-1" />
  </div>
</template>

<style>
body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
