<template>
  <router-view v-slot="{ Component }">
    <keep-alive exclude="Detail">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <main-tab-bar></main-tab-bar>
</template>

<script>
import MainTabBar from '@/components/content/mainTabBar/MainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style scoped>
@import 'assets/css/base.css';
</style>
