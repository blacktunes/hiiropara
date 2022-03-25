<template>
  <transition name="fade" appear @after-leave="end">
    <div class="wrapper" v-if="isShow">
      <img class="img" :src="bg" />
      <div class="button start" @click="showMsg"></div>
      <div class="button load"></div>
      <div class="button config"></div>
      <div class="button extra" @click="showTip" v-if="extra"></div>
      <div class="button extra-disable" v-else></div>
      <div class="button exit" @click="exit"></div>
      <transition name="fade">
        <img class="tip" src="@/assets/images/tip.png" v-if="tipShow" @click="hideTip" />
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['end'])

const bg = process.env.NODE_ENV === 'development' ? require('@/assets/images/title_bg.png') : 'https://cdn.jsdelivr.net/gh/blacktunes/hiiropara@master/src/assets/images/title_bg.png'
const 我打你啊 = new Audio(process.env.NODE_ENV === 'development' ? require('@/assets/voices/我打你啊.mp3') : 'https://cdn.jsdelivr.net/gh/blacktunes/hiiropara@master/src/assets/voices/我打你啊.mp3')
const 喵 = new Audio(process.env.NODE_ENV === 'development' ? require('@/assets/voices/喵.mp3') : 'https://cdn.jsdelivr.net/gh/blacktunes/hiiropara@master/src/assets/voices/喵.mp3')

const isShow = ref(true)
const extra = ref(false)
const tipShow = ref(false)

const showMsg = () => {
  喵.play()
  isShow.value = false
}

const end = () => {
  emit('end')
}

const showTip = () => {
  我打你啊.play()
  我打你啊.onended = () => {
    tipShow.value = true
  }
}

const hideTip = () => {
  tipShow.value = false
}

const exit = () => {
  window.location.href = 'https://www.bilibili.com/video/BV1GJ411x7h7'
}

const show = () => {
  isShow.value = true
}

const setExtra = () => {
  extra.value = true
}

defineExpose({ show, setExtra })
</script>

<style lang="stylus" scoped>
setTop(num)
  top 23 + 13 * (num - 1) + '%'

bg()
  background-repeat no-repeat
  background-size cover

pointer()
  cursor url('~@/assets/static/cur_over.cur'), pointer

.wrapper
  position relative

  .img
    margin auto
    max-width 100vw
    max-height 100vh

  .button
    position absolute
    width 16%
    height 13%
    right 1.5%

  .start
    setTop(1)
    background url('@/assets/images/start.png')
    bg()
    pointer()

    &:hover
      background url('@/assets/images/start_hover.png')
      bg()

    &:active
      background url('@/assets/images/start_active.png')
      bg()

  .load
    setTop(2)
    background url('@/assets/images/load.png')
    bg()
    cursor not-allowed

  .config
    setTop(3)
    background url('@/assets/images/config.png')
    bg()
    cursor not-allowed

  .extra
    setTop(4)
    background url('@/assets/images/extra.png')
    bg()
    pointer()

    &:hover
      background url('@/assets/images/extra_hover.png')
      bg()

    &:active
      background url('@/assets/images/extra_active.png')
      bg()

  .extra-disable
    setTop(4)
    background url('@/assets/images/extra_disable.png')
    bg()
    cursor not-allowed

  .exit
    setTop(5)
    background url('@/assets/images/exit.png')
    bg()
    pointer()

    &:hover
      background url('@/assets/images/exit_hover.png')
      bg()

    &:active
      background url('@/assets/images/exit_active.png')
      bg()

  .tip
    position absolute
    top 0
    left 0
    margin auto
    max-width 100%
    max-height 100%
</style>
