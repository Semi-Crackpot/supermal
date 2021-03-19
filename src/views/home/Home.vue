<template>
  <div id="home">
    <nav-bar class='home-nav'>
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="fix"
      @tabClick="tabClick" v-show="isShowTabControl" ref="tabControlOutScroll"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature></feature>
      <tab-control :titles="['流行','新款','精选']"
      @tabClick="tabClick" ref="tabControlInScroll"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>

    <back-top @click="btnBackTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from '@/views/home/childComponents/HomeSwiper'
import HomeRecommendView from '@/views/home/childComponents/HomeRecommendView'
import Feature from '@/views/home/childComponents/feature.vue'

import TabControl from '@/components/content/tabControl/TabControl.vue'
import GoodsList from '@/components/content/goods/GoodsList'
import BackTop from '@/components/content/backtop/BackTop'

import Scroll from '@/components/common/scroll/Scroll'
import NavBar from '@/components/common/navbar/NavBar'

import {getHomeMultidata, getHomeGoods} from '@/network/home.js'

export default {
  name: "Name",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    Feature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list:[]},
        'new': {page: 0, list:[]},
        'sell': {page: 0, list:[]},
      },
      currentType:'pop',
      isShowBackTop: false,
      isShowTabControl: false,
      tabOffsetTop: 0,
      saveY: 0,
    }
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 30)
    this.$refs.scroll.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType ='pop';
          break;
        case 1:
          this.currentType ='new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      this.$refs.tabControlInScroll.currentIndex = index
      this.$refs.tabControlOutScroll.currentIndex = index
    },
    btnBackTop() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 2000
      this.isShowTabControl = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.scroll.refresh()
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControlInScroll.$el.offsetTop;
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list,
      this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .fix {
    position: fixed;
    top: 44px;
    left: 0px;
    right: 0px;
    z-index: 9;
  }
  .content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }
</style>