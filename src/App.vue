<template>
  <div
    class="main"
    :style="{ width, height }"
  >
    <div
      class="wrapper"
      :style="{ transform: `scale(${scale})` }"
    >
      <Preload @start="start" />
      <Logo
        ref="logoRef"
        @end="showTitle"
      />
      <Title
        ref="titleRef"
        @end="titleEnd"
      />
      <Message
        ref="messageRef"
        @exit="messageExit"
        @end="showTitle"
      />
      <Extra
        ref="extraRef"
        @end="showTitle"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Preload from './components/Preload.vue'
import Logo from './components/Logo.vue'
import Title from './components/Title.vue'
import Message from './components/Message.vue'
import Extra from './components/Extra.vue'

const scale = ref(1)
const width = computed(() => `${1280 * scale.value}px`)
const height = computed(() => `${720 * scale.value}px`)

const setSize = () => {
  const h = window.innerWidth / 1280
  const v = window.innerHeight / 720
  scale.value = Math.min(h, v)
}
setSize()

window.onresize = () => {
  setSize()
}

const logoRef = ref(null)
const titleRef = ref(null)
const messageRef = ref(null)
const extraRef = ref(null)

const start = () => {
  logoRef.value.show()
}

const messageExit = (flag) => {
  messageRef.value.hide()
  if (flag) {
    titleRef.value.setExtra()
  }
  document.onkeydown = null
}

const showTitle = () => {
  titleRef.value.show()
}

const titleEnd = (code) => {
  if (code === 0) {
    messageRef.value.show()
    document.onkeydown = ({ key }) => {
      if (key === 'Enter' || key === 'Control') {
        messageRef.value.next()
      }
    }
    return
  }
  if (code === 3) {
    extraRef.value.show()
  }
}
</script>

<style lang="stylus" scoped>
.main
  overflow hidden
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  margin auto

  .wrapper
    width 1280px
    height 720px
    transform-origin left top
</style>
