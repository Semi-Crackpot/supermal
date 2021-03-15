<template>
  <div class="back-top">
    <img src="@/assets/img/common/top.png" @click="btnBackTop">
  </div>
</template>

<script>
export default {
  name : "BackTop",
  methods: {
    btnBackTop() {
      this.$emit('btnBackTop')
    },
  }
}
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 8px;
    bottom: 55px;
  }
  .back-top img {
    width: 43px;
    height: 43px;
  }
</style>