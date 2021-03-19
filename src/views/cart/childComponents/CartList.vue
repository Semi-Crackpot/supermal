<template>
  <div class="cart-list">
    <cart-item v-for="(item, index) in getCartList" :key="index" :item-info="item"></cart-item>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CartItem from './CartItem.vue'
export default {
  name:"CartList",
  components:{
    CartItem
  },
  computed:{
    ...mapGetters(['getCartList'])
  },
}
</script>

<style scoped>
  /* .cart-list{
    height: calc(100% - 44px - 49px);;
  }
  .content{
    height: 100vh;
    overflow: hidden;
  } */
</style>