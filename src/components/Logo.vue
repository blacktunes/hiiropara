<template>
  <transition name="fade" appear @after-appear="play" @after-leave="end">
    <div class="logo" v-if="isShow">
      <img class="img" :src="IMAGES.brandlogo" />
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { IMAGES, AUDIOS } from '@/assets/scripts/preload'

const emit = defineEmits(['end'])
const isShow = ref(true)

const show = () => {
  isShow.value = true
}

const play = () => {
  AUDIOS.喵.play()
  isShow.value = false
}

const end = () => {
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
