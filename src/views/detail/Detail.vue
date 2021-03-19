<template>
  <div id = "detail">
    <detail-nav-bar class="detail-nav" @detailTitleClick="detailTitleClick" ref="detailNavBar"></detail-nav-bar>
    <scroll class="scroll" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-basic-info :goods="goods"></detail-basic-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-params-info class = "detail-params-info" ref="detailParamsInfo" :param-info="paramInfo"></detail-params-info>
      <detail-comment-info :commentInfo="commentInfo" ref="detailCommentInfo"></detail-comment-info>
      <goods-list :goods="recommnedInfo" ref="detailRecommentInfo"></goods-list>
    </scroll>
    <back-top @click="detailBackTopClick" v-show="isShowBackTop"></back-top>
    <detail-botton-bar @click="addToCart"></detail-botton-bar>
  </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll.vue'
import GoodsList from '@/components/content/goods/GoodsList.vue'
import {getDetail ,Goods, Shop, GoodsParam, getRecommend} from '@/network/detail.js'
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailBasicInfo from './childComponents/DetailBasicInfo'
import DetailShopInfo from './childComponents/DetailShopInfo.vue'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo.vue'
import DetailParamsInfo from './childComponents/DetailParamsInfo.vue'
import DetailCommentInfo from './childComponents/DetailCommentInfo.vue'
import DetailBottonBar from './childComponents/DetailBottonBar.vue'
import BackTop from '@/components/content/backtop/BackTop.vue'

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo: {},
      commentInfo: {},
      recommnedInfo:[],
      navBarItemY:[0,0,0,0],
      currentIndex:0,
      isShowBackTop:false
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBasicInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottonBar,
    BackTop,
  },
  created(){
    this.iid = this.$route.params.iid;

    getDetail(this.iid).then(res => {
      const data = res.result;

      this.topImages = data.itemInfo.topImages;

      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      this.shop = new Shop(data.shopInfo);

      this.detailInfo = data.detailInfo;

      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    })

    getRecommend(this.iid).then(res => {
      this.recommnedInfo = res.data.list
    })


  },
  methods: {
    imageLoad() {
      this.$refs.scroll.scroll.refresh()
      this.navBarItemY[1] = this.$refs.detailParamsInfo.$el.offsetTop - 44;
      this.navBarItemY[2] = this.$refs.detailCommentInfo.$el.offsetTop - 44;
      this.navBarItemY[3] = this.$refs.detailRecommentInfo.$el.offsetTop - 44;
      this.navBarItemY[4] = this.$refs.detailRecommentInfo.$el.offsetTop + 1000;
    },
    detailTitleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.navBarItemY[index], 100)
      this.$refs.scroll.scroll.refresh()
    },
    contentScroll(position) {
        const positionY = -position.y
        for (let i = 0; i < this.navBarItemY.length - 1; i++) {
          if (this.currentIndex != i) {
            if (positionY >= this.navBarItemY[i] && positionY < this.navBarItemY[i + 1]) {
              this.currentIndex = i
              this.$refs.detailNavBar.currentIndex = this.currentIndex
            }
          }
        }
        this.isShowBackTop = positionY > 1000
    },
    detailBackTopClick(){
      this.$refs.scroll.scrollTo(0, 0)
    },
    addToCart(){
      const obj = {}
      obj.iid = this.iid
      obj.imgURL = this.topImages[0]
      obj.title = this.goods.title
      obj.desc = this.goods.desc
      obj.nowPrice = this.goods.nowPrice
      this.$store.dispatch("addCart", obj)
      console.log(obj.nowPrice)
    }
  },
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .scroll{
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>