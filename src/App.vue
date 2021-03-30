<template>
    <router-view v-slot="{ Component }">
    <keep-alive exclude="Detail">
      <component :is="Component" />
    </keep-alive>
    </router-view>
    <div v-show="isShow">
      <main-tab-bar></main-tab-bar>
    </div>
</template>

<script>
import MainTabBar from '@/components/content/mainTabBar/MainTabBar'
import Login from '@/views/login/Login'
export default {
  name: 'App',
  components: {
    MainTabBar,
    Login,
  },
  computed: {
    isShow() {
      console.log(this.$store.state.userInfo.isExist)
      if (this.$store.state.userInfo.isExist) return true;
      else return false;
    }
  }
}
</script>

<style scoped>
@import 'assets/css/base.css';
</style>
