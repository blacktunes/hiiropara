<template>
  <div
    class="loading"
    v-if="isShow"
  >
    <img
      class="img"
      :src="IMAGES['title_bg.webp']"
    />
    <div class="dialog">
      <img
        class="dialog-img"
        :src="IMAGES['dialog.webp']"
      />
    </div>
    <transition name="fade">
      <div
        class="text"
        v-if="!ready"
      >
        {{ progressText }}
      </div>
    </transition>
    <div
      class="btn"
      :style="{ bottom: ready ? '49%' : '40%', fontSize: ready ? '90px' : '24px' }"
      @click="start"
    >
      {{ `${ready ? '开始' : '直接'}涩猫` }}
    </div>
  </div>
</template>

<script setup>
import { IMAGES, progress } from '@/assets/scripts/preload'
import { computed, ref } from 'vue'

const emit = defineEmits(['start'])

const isShow = ref(true)
const progressText = computed(() => `${((progress.value[0] / progress.value[1]) * 100) | 0}%`)
const ready = computed(() => progress.value[0] >= progress.value[1])

const start = () => {
  isShow.value = false
  emit('start')
}
</script>

<style lang="stylus" scoped>
@import '@/assets/style/fn.styl'

.loading
  position relative
  width 100%
  height 100%

  .img
    margin auto
    width 100%
    height 100%

  .dialog
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    background rgba(0, 0, 0, 0.5)
    display flex
    justify-content center
    align-items center

    .dialog-img
      width 700px

  .text
    position absolute
    left 50%
    top 46%
    transform translate(-50%, -50%)
    font-size 90px
    text-align center
    color #662211

  .btn
    position absolute
    left 50%
    bottom 40%
    transform translate(-50%, 50%)
    font-size 24px
    font-weight bold
    text-align center
    color #662211
    pointer()
    transition bottom 0.5s, font-size 0.5s 0.5s
    text-shadow 1px 0 rgba(255, 255, 255, 0.6), -1px 0 rgba(255, 255, 255, 0.6), 0 1px rgba(255, 255, 255, 0.6), 0 -1px rgba(255, 255, 255, 0.6), 2px 0 2px rgba(0, 0, 0, 0.2), -2px 0 2px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.2), 0 -2px 2px rgba(0, 0, 0, 0.2)
    animation shake 4s infinite

    &:hover
      color #cc6644

    &:active
      color #ffb911

@keyframes shake
  30%
    transform translate(-50%, 50%)

  35%
    transform translate(-50%, 40%)

  40%
    transform translate(-50%, 50%)

  45%
    transform translate(-50%, 40%)

  50%
    transform translate(-50%, 50%)

  100%
    transform translate(-50%, 50%)
</style>
