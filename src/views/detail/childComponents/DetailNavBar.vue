<template>
  <div class="DetailNavBar">
    <nav-bar>
      <template v-slot:left>
        <img src = '@/assets/img/common/back.svg' class = "back-icon" @click="backIconClick">
      </template>
      <template v-slot:center >
        <div class="detial-title">
          <div v-for="(item, index) in navBarItem" :key="item"
               class="detail-title-text"
               @click="detailTitleClick(index)"
               :class="{active: index == currentIndex}">
               {{item}}
               </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
export default {
  name:"DetailNavBar",
  data() {
    return {
      navBarItem:['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  components:{
    NavBar
  },
  methods: {
    detailTitleClick(index) {
      this.currentIndex = index
    },
    backIconClick() {
      this.$router.back()
    }
  }
}

</script>

<style scoped>
  .detial-title{
    display: flex;
  }

  .detail-title-text{
    flex: 1;
    font-size: 13px;
  }

  .active{
    color: var(--color-high-text)
  }

  .back-icon{
    margin-top: 10px;
  }
</style>