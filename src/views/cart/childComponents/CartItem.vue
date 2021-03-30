<template>
  <div id="shop-item">
    <!-- <div class="item-selector">
      <CheckButton @checkBtnClick="checkedChange" v-model="itemInfo.checked"></CheckButton>
    </div> -->
    <div class="item-check" @click="btnIconIsActive">
      <div v-if="!itemInfo.check" >
        <img src="@/assets/img/cart/dagou.svg">
      </div>
      <div v-else>
        <img src="@/assets/img/cart/dagou_fill.svg">
      </div>
    </div>
    <div class="item-img">
      <img :src="itemInfo.imgURL" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.nowPrice}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name : "CartItem",
  props: {
    itemInfo:{
      type:Object
    }
  },
  data() {
    return {
      // iconIsActive:false
    }
  },
  methods: {
    btnIconIsActive() {
      this.$store.dispatch("checkChange", this.itemInfo)
    }
  }
}
</script>

<style scoped>
    #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .item-check {
    width: 18%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-check img{
    width: 20px;
    height: 20px;
  }
  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }
  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
  .info-bottom .item-price {
    color: orangered;
  }
</style>