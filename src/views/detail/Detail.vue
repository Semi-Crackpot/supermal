<template>
  <div class = "detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
import {getDetail} from '@/network/detail.js'

import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper
  },
  created(){
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      console.log(res.result.itemInfo.topImages)
      this.topImages = res.result.itemInfo.topImages
    })
  }
}
</script>

<style>

</style>