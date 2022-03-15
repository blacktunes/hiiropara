<template>
  <div class="title">
    <transition name="fade">
      <div class="wrapper" v-if="title">
        <img class="img" alt="title" src="./assets/hiiropara.png" />
        <div class="button button1" @click="click"></div>
        <div class="button button2"></div>
        <div class="button button3"></div>
        <div class="button button4" @click="click"></div>
        <a class="button button5" href="https://www.bilibili.com/video/BV1GJ411x7h7"></a>
        <transition name="fade">
          <img
            class="tip"
            alt="tip"
            src="./assets/tip.png"
            v-if="show"
            @click="hide"
          />
        </transition>
      </div>
    </transition>
  </div>
  <div class="logo-wrapper">
    <transition name="logo" @after-enter="playVoice" @after-leave="showTitle">
      <img class="logo" alt="logo" src="./assets/logo.png" v-if="logo" />
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const logo = ref(false)
const title = ref(false)

const logoAudio = new Audio('https://cdn.jsdelivr.net/gh/blacktunes/hiiro-button@master/public/voices/%E5%96%B52.mp3')
const audio = new Audio('https://cdn.jsdelivr.net/gh/blacktunes/hiiro-button@master/public/voices/%E6%88%91%E6%89%93%E4%BD%A0%E5%95%8A.mp3')

logoAudio.oncanplay = () => {
  logo.value = true
}

const playVoice = () => {
  logoAudio.play()
  logo.value = false
}

const showTitle = () => {
  title.value = true
}

const show = ref(false)

const click = () => {
  audio.play()
  audio.onended = () => {
    show.value = true
  }
}

const hide = () => {
  show.value = false
}
</script>

<style lang="stylus">
body
  margin 0
  user-select none

img
  -webkit-user-drag none

bg()
  background-repeat no-repeat
  background-size cover

.title
  position fixed
  inset 0
  display flex
  align-items center
  justify-content center

  .wrapper
    position relative

    .img
      margin auto
      max-width 100vw
      max-height 100vh

    .button
      position absolute
      width 13%
      height 11%
      right 3.5%

    .button1
      top 26.2%
      background url('./assets/1.png')
      bg()
      cursor pointer

      &:hover
        background url('./assets/1_hover.png')
        bg()

    .button2
      top 38.4%
      cursor not-allowed

    .button3
      top 50.8%
      cursor not-allowed

    .button4
      top 63.4%
      background url('./assets/4.png')
      bg()
      cursor pointer

      &:hover
        background url('./assets/4_hover.png')
        bg()

    .button5
      top 75.6%
      background url('./assets/5.png')
      bg()
      cursor pointer

      &:hover
        background url('./assets/5_hover.png')
        bg()

    .tip
      position absolute
      top 0
      left 0
      margin auto
      max-width 100%
      max-height 100%

.logo-wrapper
  position fixed
  inset 0
  display flex
  align-items center
  justify-content center
  pointer-events none

  .logo
    margin auto
    max-width 100vw
    max-height 100vh

.fade-enter-active, .fade-leave-active
  transition opacity 0.3s

.fade-enter-from, .fade-leave-to
  opacity 0

.fade-enter-to, .fade-leave-from
  opacity 1

.logo-enter-active, .logo-leave-active
  transition opacity 1.5s

.logo-enter-from, .logo-leave-to
  opacity 0

.logo-enter-to, .logo-leave-from
  opacity 1
</style>
