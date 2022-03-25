<template>
  <div class="main">
    <Preload />
    <Title ref="titleRef" @end="titleEnd" />
    <Message ref="messageRef" @exit="messageExit" @end="messageEnd" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Preload from './components/Preload.vue'
import Title from './components/Title.vue'
import Message from './components/Message.vue'

const titleRef = ref(null)
const messageRef = ref(null)

const messageExit = () => {
  messageRef.value.hide()
  titleRef.value.setExtra()
  document.onkeydown = null
}

const messageEnd = () => {
  titleRef.value.show()
}

const titleEnd = () => {
  messageRef.value.show()
  document.onkeydown = ({ keyCode }) => {
    if (keyCode === 13) {
      messageRef.value.next()
    }
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
