<template>
  <transition name="fade" @after-leave="end">
    <div class="extra" v-if="isShow">
      <img class="img" :src="IMAGES.bg" />
      <img class="img" src="@/assets/images/extra_bg.png" />
      <div class="cg-btn"></div>
      <div class="cg-box">
        <div class="item active" @click="showCG(IMAGES.cg_1)">
          <img style="width: 92%" src="@/assets/images/cg_1_preview.jpg" />
        </div>
        <div class="item" v-for="item in 14" :key="item"></div>
      </div>
      <div class="back" @click="back"></div>
      <transition name="fade">
        <div class="cg-preview" v-if="isCGShow">
          <img class="cg" :src="cg" @click="hideCG" />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { IMAGES } from '@/assets/scripts/preload'
import { ref } from 'vue'

const emit = defineEmits(['end'])

const isShow = ref(false)

const isCGShow = ref(false)
const cg = ref('')

const showCG = (url) => {
  cg.value = url
  isCGShow.value = true
}

const hideCG = () => {
  isCGShow.value = false
  cg.value = ''
}

const show = () => {
  isShow.value = true
}

const back = () => {
  isShow.value = false
}

const end = () => {
  emit('end')
}

defineExpose({ show })
</script>

<style lang="stylus" scoped>
@import '@/assets/style/fn.styl'

.extra
  position relative
  width 100%
  height 100%

  .img
    position absolute
    top 0
    left 0
    width 100%
    height 100%

  .cg-btn
    position absolute
    width 11%
    height 12%
    top 10%
    left 50%
    transform translateX(-50%)
    background url('@/assets/images/extra_cg.png')
    bg()

  .cg-box
    position absolute
    top 30%
    left 10%
    width 80%
    height 53.5%
    display flex
    flex-wrap wrap
    justify-content center

    .item
      overflow hidden
      flex 0 0 18%
      display flex
      justify-content center
      align-items center
      height 28%
      margin 1%
      background #000
      background url('@/assets/images/extra_item.png')
      bg()
      pointer()

    .active
      &:hover
        background url('@/assets/images/extra_item_hover.png')
        bg()

      &:active
        background url('@/assets/images/extra_item_active.png')
        bg()

  .back
    position absolute
    width 6%
    height 10%
    bottom 0
    right 1.5%
    background url('@/assets/images/extra_back.png')
    bg()
    pointer()

    &:hover
      background url('@/assets/images/extra_back_hover .png')
      bg()

    &:active
      background url('@/assets/images/extra_back_active.png')
      bg()

  .cg-preview
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    overflow-x hidden
    overflow-y scroll

    .cg
      width 100%
</style>
