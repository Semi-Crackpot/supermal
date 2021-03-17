<template>
  <div id = "detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-basic-info :goods="goods"></detail-basic-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-params-info :param-info="paramInfo"></detail-params-info>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll.vue'
import {getDetail ,Goods, Shop, GoodsParam} from '@/network/detail.js'
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailBasicInfo from './childComponents/DetailBasicInfo'
import DetailShopInfo from './childComponents/DetailShopInfo.vue'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo.vue'
import DetailParamsInfo from './childComponents/DetailParamsInfo.vue'

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
      abc:{},
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
  },
  created(){
    this.iid = this.$route.params.iid

    getDetail(this.iid).then(res => {
      const data = res.result;
      console.log(data);
      this.topImages = data.itemInfo.topImages;

      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      this.shop = new Shop(data.shopInfo);

      this.detailInfo = data.detailInfo;

      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.scroll.refresh()
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
  .content{
    height: calc(100% - 44px);
  }
</style>