<template>
  <!-- <div style="display:none">
    <img v-for="(url, key) in IMAGES" :key="key" :src="url" @load="setReady" />
  </div> -->
  <div class="loading" v-if="isShow">
    <img class="img" :src="IMAGES.title_bg" />
    <div class="dialog">
      <img class="dialog-img" src="@/assets/images/dialog.png" />
    </div>
    <transition name="fade">
      <div class="text" v-if="!ready">{{ progress }}</div>
    </transition>
    <div
      class="btn"
      :style="{ bottom: ready ? '49%' : '40%', fontSize: ready ? '90px' : '24px' }"
      @click="start"
    >{{ `${ready ? '开始' : '直接'}涩猫` }}</div>
    <div class="tip">(界面还是有点丑，先用着)</div>
  </div>
</template>

<script setup>
import { IMAGES, AUDIOS } from '@/assets/scripts/preload'
import { computed, ref } from 'vue'

const emit = defineEmits(['start'])

const length = Object.keys(AUDIOS).length

const isShow = ref(true)
const loadedNum = ref(0)
const progress = computed(() => `${((loadedNum.value / length * 100) | 0)}%`)
const ready = computed(() => loadedNum.value >= length)

for (const i in AUDIOS) {
  AUDIOS[i].oncanplay = () => {
    setReady()
  }
}

const setReady = () => {
  ++loadedNum.value
}

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
    background rgba(0,0,0,0.5)
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
    text-shadow 1px 0 rgba(255,255,255,0.6), -1px 0 rgba(255,255,255,0.6), 0 1px rgba(255,255,255,0.6), 0 -1px rgba(255,255,255,0.6), 2px 0 2px rgba(0,0,0,0.2), -2px 0 2px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.2), 0 -2px 2px rgba(0,0,0,0.2)
    animation shake 4s infinite

    &:hover
      color #cc6644

    &:active
      color #ffb911

  .tip
    position absolute
    left 50%
    bottom 20px
    transform translateX(-50%)
    font-size 16px
    color #aaa

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
