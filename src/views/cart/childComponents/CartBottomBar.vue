<template>
  <div class = "bottom-bar" v-show="isHidden">
    <div class="item-check">
      <div v-if="!selectAll" >
        <img src="@/assets/img/cart/dagou.svg">
      </div>
      <div v-else>
        <img src="@/assets/img/cart/dagou_fill.svg">
      </div>
    </div>
    <span class="select-all">全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去结算({{totolNum}})</span>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "CartBottomBar",
  computed: {
    ...mapGetters(["getCartList",'getLength']),
    isHidden() {
      // return this.getCartList.length
      return true
    },
    selectAll() {
      for(let i = 0; i < this.getCartList.length; i++) {
        if(!this.getCartList[i].check) return false;
      }
      return true;
    },
    totalPrice() {
      let sum = 0
      for(let i = 0; i < this.getCartList.length; i++) {
        if(this.getCartList[i].check) sum += this.getCartList[i].count * this.getCartList[i].nowPrice;
      }
      return sum.toFixed(2)
    },
    totolNum() {
      let sum = 0
      for(let i = 0; i < this.getCartList.length; i++) {
        if(this.getCartList[i].check) sum += this.getCartList[i].count;
      }
      return sum
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }
  .item-check {
    position: absolute;
    line-height: 0;
    left: 8px;
    top: 10px;
  }
  .item-check img{
    width: 20px;
    height: 20px;
  }
  .bottom-bar .select-all {
    margin-top: 8px;
    font-size: 16px;
    color: #666;
  }

  .bottom-bar .total-price {
    margin-left: 55px;
    font-size: 16px;
    color: #666;
  }
  .bottom-bar .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>