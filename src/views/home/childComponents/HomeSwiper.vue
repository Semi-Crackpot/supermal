<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperImageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper/index'
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false,
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    swiperImageLoad() {
      if (!this.isLoad) {this.isLoad = !this.isLoad
      this.$emit("swiperImageLoad")}
    }
  }
}
</script>

<style>

</style>