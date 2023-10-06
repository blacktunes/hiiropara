<template>
  <transition
    name="fade"
    @after-enter="play"
    @after-leave="end"
  >
    <div
      class="logo"
      v-if="isShow"
    >
      <img
        class="img"
        :src="IMAGES['brandlogo.webp']"
      />
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { IMAGES, AUDIOS } from '@/assets/scripts/preload'

const emit = defineEmits(['end'])
const isShow = ref(false)

const show = () => {
  isShow.value = true
}

const play = () => {
  AUDIOS['喵.mp3'].play()
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
