<template>
  <transition name="fade" @after-leave="end">
    <div class="extra" v-if="isShow">
      <img class="img" :src="IMAGES['bg.webp']" />
      <img class="img" :src="IMAGES['extra_bg.webp']" />
      <div class="cg-btn"></div>
      <div class="cg-box">
        <div class="item active" @click="showCG(IMAGES['cg_1.webp'])">
          <img style="width: 92%" :src="IMAGES['cg_1_preview.webp']" />
        </div>
        <div class="item" v-for="item in 14" :key="item"></div>
      </div>
      <div class="back" @click="back"></div>
      <transition name="fade">
        <div class="cg-preview" v-if="isCGShow">
          <img class="cg" :src="cg" @click="hideCG" />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { IMAGES } from '@/assets/scripts/preload'
import { computed, ref } from 'vue'

const emit = defineEmits(['end'])

const isShow = ref(false)

const isCGShow = ref(false)
const cg = ref('')

const showCG = (url) => {
  cg.value = url
  isCGShow.value = true
}

const hideCG = () => {
  isCGShow.value = false
  cg.value = ''
}

const show = () => {
  isShow.value = true
}

const back = () => {
  isShow.value = false
}

const end = () => {
  emit('end')
}

defineExpose({ show })

/* eslint-disable */
const extra_cg = computed(() => `url('${IMAGES['extra_cg.webp']}')`)
const extra_item = computed(() => `url('${IMAGES['extra_item.webp']}')`)
const extra_item_hover = computed(() => `url('${IMAGES['extra_item_hover.webp']}')`)
const extra_item_active = computed(() => `url('${IMAGES['extra_item_active.webp']}')`)
const extra_back = computed(() => `url('${IMAGES['extra_back.webp']}')`)
const extra_back_hover = computed(() => `url('${IMAGES['extra_back_hover.webp']}')`)
const extra_back_active = computed(() => `url('${IMAGES['extra_back_active.webp']}')`)
/* eslint-enable */
</script>

<style lang="stylus" scoped>
@import '@/assets/style/fn.styl'

.extra
  position relative
  width 100%
  height 100%

  .img
    position absolute
    top 0
    left 0
    width 100%
    height 100%

  .cg-btn
    position absolute
    width 11%
    height 12%
    top 10%
    left 50%
    transform translateX(-50%)
    background v-bind(extra_cg)
    bg()

  .cg-box
    position absolute
    top 30%
    left 10%
    width 80%
    height 53.5%
    display flex
    flex-wrap wrap
    justify-content center

    .item
      overflow hidden
      flex 0 0 18%
      display flex
      justify-content center
      align-items center
      height 28%
      margin 1%
      background #000
      background v-bind(extra_item)
      bg()
      pointer()

    .active
      &:hover
        background v-bind(extra_item_hover)
        bg()

      &:active
        background v-bind(extra_item_active)
        bg()

  .back
    position absolute
    width 6%
    height 10%
    bottom 0
    right 1.5%
    background v-bind(extra_back)
    bg()
    pointer()

    &:hover
      background v-bind(extra_back_hover)
      bg()

    &:active
      background v-bind(extra_back_active)
      bg()

  .cg-preview
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    overflow-x hidden
    overflow-y scroll

    &::-webkit-scrollbar
      width 7px
      height 7px

    &::-webkit-scrollbar-track
      border-radius 5px
      box-shadow inset 0 0 6px rgba(0, 0, 0, 0.3)

    &::-webkit-scrollbar-thumb
      border-radius 5px
      box-shadow inset 0 0 6px rgba(0, 0, 0, 0.1)
      background-color #e3b6b1

    &::-webkit-scrollbar-thumb:active
      background-color #ffc9c3

    .cg
      display block
      width 100%
</style>
