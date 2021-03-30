<template>
  <nav-bar class="cart-nav">
    <template v-slot:center>
      购物车({{getLength}})
    </template>
  </nav-bar>

  <scroll class="scroll" ref="scroll">
    <cart-list class="cart-list"></cart-list>
  </scroll>

  <cart-bottom-bar></cart-bottom-bar>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import CartBottomBar from './childComponents/CartBottomBar'
import {mapGetters} from 'vuex'
import CartList from './childComponents/CartList.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
export default {
  name: "Cart",
  components:{
    NavBar,
    CartList,
    Scroll,
    CartBottomBar,
  },
  computed: {
    ...mapGetters(['getLength'])
  },
  activated() {
    this.$refs.scroll.scroll.refresh()
  },
}
</script>

<style>
  .cart-nav{
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .scroll{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }
</style>