<template>
  <transition name="fade" @after-leave="end">
    <div class="title" v-if="isShow">
      <img class="bg" :src="IMAGES.title_bg" />
      <img class="menu" src="@/assets/images/title.jpg" />
      <div class="button start" @click="toMessage"></div>
      <div class="button load"></div>
      <div class="button config"></div>
      <div class="button extra" @click="toExtra" v-if="extra"></div>
      <div class="button extra-disable" v-else></div>
      <div class="button exit" @click="exit"></div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { IMAGES } from '@/assets/scripts/preload'

const emit = defineEmits(['end'])

const isShow = ref(false)
const extra = ref(false)
let flag = 0

const toMessage = () => {
  flag = 0
  isShow.value = false
}

const toExtra = () => {
  flag = 3
  isShow.value = false
}

const end = () => {
  emit('end', flag)
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
@import '@/assets/style/fn.styl'

setTop(num)
  top 23 + 13 * (num - 1) + '%'

.title
  position relative
  width 100%
  height 100%

  .bg
    margin auto
    width 100%
    height 100%

  .menu
    position absolute
    top 0
    right 0

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
</style>
