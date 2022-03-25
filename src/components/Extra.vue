<template>
  <transition name="fade">
    <div class="extra" v-if="isShow">
      <img class="img" src="@/assets/images/empty.png" />
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
const isShow = ref(false)
</script>

<style lang="stylus" scoped>
.extra
  position relative
  background #fff

  .img
    margin auto
    max-width 100vw
    max-height 100vh
</style>
