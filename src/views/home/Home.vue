<template>
  <div id="home">
    <nav-bar class='home-nav'>
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import {getHomeMultidata} from '@/network/home.js'
import HomeSwiper from '@/views/home/childComps/HomeSwiper'
import HomeRecommendView from '@/views/home/childComps/HomeRecommendView'

export default {
  name: "Name",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView
  },
  data() {
    return {
      banners: [],
      recommends: [],
    }
  },
  created() {
    //1.请求多个数据
    getHomeMultidata().then(res => {
      console.log(res)
      this.banners = res.data.banner.list,
      this.recommends = res.data.recommend.list
    })
  }
}
</script>

<style>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>