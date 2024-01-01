<script setup>
import HelloWorld from './components/HelloWorld.vue';
// 设置暗色模式
document.documentElement.setAttribute('theme-mode', 'dark');
</script>

<template>
  <t-layout>
    <t-header>Header</t-header>
    <t-content>
      <HelloWorld/>
    </t-content>
    <t-footer>Footer</t-footer>
  </t-layout>
</template>

<style scoped>
</style>
