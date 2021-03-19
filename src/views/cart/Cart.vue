<template>
  <div>
    <nav-bar class="cart-nav">
      <template v-slot:center>
        购物车({{getLength}})
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import {mapGetters} from 'vuex'
export default {
  name: "Cart",
  components:{
    NavBar,
  },
  computed: {
    ...mapGetters(['getLength'])
  }
}
</script>

<style scoped>
  .cart-nav{
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
</style>