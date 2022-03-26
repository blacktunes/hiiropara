<template>
  <transition name="fade" @after-leave="end">
    <div class="extra" v-if="isShow">
      <img class="img" src="@/assets/images/bg.png" />
      <img class="img" src="@/assets/images/extra_bg.png" />
      <div class="cg-btn"></div>
      <div class="cg-box">
        <div class="item active" @click="showTip">
          <img style="width: 92%" src="@/assets/images/cg_1.png" />
        </div>
        <div class="item" v-for="item in 14" :key="item"></div>
      </div>
      <div class="back" @click="back"></div>
      <transition name="fade">
        <img class="tip" src="@/assets/images/tip.png" v-if="tipShow" @click="hideTip" />
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['end'])

const isShow = ref(false)

const 我打你啊 = new Audio(process.env.NODE_ENV === 'development' ? require('@/assets/voices/我打你啊.mp3') : 'https://cdn.jsdelivr.net/gh/blacktunes/hiiropara@master/src/assets/voices/我打你啊.mp3')

const tipShow = ref(false)

const showTip = () => {
  我打你啊.play()
  我打你啊.onended = () => {
    tipShow.value = true
  }
}

const hideTip = () => {
  tipShow.value = false
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

  .tip
    position absolute
    top 0
    left 0
    margin auto
    max-width 100%
    max-height 100%
</style>
