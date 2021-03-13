<template>
    <div class="tab-bar-item" @click="itemClick">

      <div v-if="!iconIsActive">
        <slot name="item-icon"></slot>
      </div>
      <div v-else>
        <slot name="item-icon-active"></slot>
      </div>

      <div :style="activateStyle" :class="iconIsActive">
        <slot name="item-text"></slot>
        <!-- 插槽不能放样式，那里想变样式就在哪里加div和样式 -->
      </div>

    </div>
</template>

<script>

export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor : {
      type: String,
      default: "red"
    }
  },
  data() {
    return {
      // iconIsActive : false
    }
  },
  computed: {
    iconIsActive() {
      return this.$route.path.indexOf(this.path) != -1
    },
    activateStyle() {
      return this.iconIsActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    }
  }
}
</script>

<style>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;

  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 3px;
  }

  /* .active {
    color: black;
  }

  .noactive {
    color: gray
  } */
</style>