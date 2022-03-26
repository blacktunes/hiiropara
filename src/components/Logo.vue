<template>
  <transition name="fade" @after-enter="play" @after-leave="end">
    <div class="logo" v-if="isShow">
      <img class="img" :src="logo" />
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['end'])
const isShow = ref(false)

const logo = process.env.NODE_ENV === 'development' ? require('@/assets/images/brandlogo.png') : 'https://cdn.jsdelivr.net/gh/blacktunes/hiiropara@master/src/assets/images/brandlogo.png'

const 喵 = new Audio(process.env.NODE_ENV === 'development' ? require('@/assets/voices/喵.mp3') : 'https://cdn.jsdelivr.net/gh/blacktunes/hiiropara@master/src/assets/voices/喵.mp3')

const show = () => {
  isShow.value = true
}

const play = () => {
  喵.play()
  isShow.value = false
}

const end = () => {
  console.log(1)
  emit('end')
}

defineExpose({ show })
</script>

<style lang="stylus" scoped>
.logo
  .img
    margin auto
    width 100%
    height 100%

.fade-leave-active
  transition opacity 0.6s
  transition-delay 1s
</style>
