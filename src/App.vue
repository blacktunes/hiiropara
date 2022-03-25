<template>
  <div class="main">
    <Preload />
    <Title ref="titleRef" @end="titleEnd" />
    <Message ref="messageRef" @exit="messageExit" @end="showTitle" />
    <Extra ref="extraRef" @end="showTitle" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Preload from './components/Preload.vue'
import Title from './components/Title.vue'
import Message from './components/Message.vue'
import Extra from './components/Extra.vue'

const titleRef = ref(null)
const messageRef = ref(null)
const extraRef = ref(null)

const messageExit = () => {
  messageRef.value.hide()
  titleRef.value.setExtra()
  document.onkeydown = null
}

const showTitle = () => {
  titleRef.value.show()
}

const titleEnd = (code) => {
  if (code === 0) {
    messageRef.value.show()
    document.onkeydown = ({ keyCode }) => {
      if (keyCode === 13) {
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
  position fixed
  inset 0
  display flex
  align-items center
  justify-content center
</style>
