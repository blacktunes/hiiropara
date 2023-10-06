<template>
  <transition
    name="fade"
    @after-leave="end"
  >
    <div
      class="title"
      v-if="isShow"
    >
      <img
        class="bg"
        :src="IMAGES['title_bg.webp']"
      />
      <img
        class="menu"
        :src="IMAGES['title.webp']"
      />
      <div
        class="button start"
        @click="toMessage"
      ></div>
      <div class="button load"></div>
      <div class="button config"></div>
      <div
        class="button extra"
        @click="toExtra"
        v-if="showExtra"
      ></div>
      <div
        class="button extra-disable"
        v-else
      ></div>
      <div
        class="button exit"
        @click="onExitClick"
      ></div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { IMAGES } from '@/assets/scripts/preload'

const emit = defineEmits(['end'])

const isShow = ref(false)
const showExtra = ref(!!localStorage.getItem('hiiropara-extra'))
let flag = 0

const toMessage = () => {
  flag = 0
  isShow.value = false
}

const toExtra = () => {
  flag = 3
  isShow.value = false
}

const end = () => {
  emit('end', flag)
}

const onExitClick = () => {
  window.location.href = 'https://www.bilibili.com/video/BV1GJ411x7h7'
}

const show = () => {
  isShow.value = true
}

const setExtra = () => {
  showExtra.value = true
}

defineExpose({ show, setExtra })

/* eslint-disable */
const start = computed(() => `url('${IMAGES['start.webp']}')`)
const start_hover = computed(() => `url('${IMAGES['start_hover.webp']}')`)
const start_active = computed(() => `url('${IMAGES['start_active.webp']}')`)
const load = computed(() => `url('${IMAGES['load.webp']}')`)
const config = computed(() => `url('${IMAGES['config.webp']}')`)
const extra = computed(() => `url('${IMAGES['extra.webp']}')`)
const extra_hover = computed(() => `url('${IMAGES['extra_hover.webp']}')`)
const extra_active = computed(() => `url('${IMAGES['extra_active.webp']}')`)
const extra_disable = computed(() => `url('${IMAGES['extra_disable.webp']}')`)
const exit = computed(() => `url('${IMAGES['exit.webp']}')`)
const exit_hover = computed(() => `url('${IMAGES['exit_hover.webp']}')`)
const exit_active = computed(() => `url('${IMAGES['exit_active.webp']}')`)
/* eslint-enable */
</script>

<style lang="stylus" scoped>
@import '@/assets/style/fn.styl'

setTop(num)
  top 23 + 13 * (num - 1) + '%'

.title
  position relative
  width 100%
  height 100%

  .bg
    margin auto
    width 100%
    height 100%

  .menu
    position absolute
    top 0
    right 0

  .button
    position absolute
    width 16%
    height 13%
    right 1.5%

  .start
    setTop(1)
    background v-bind(start)
    bg()
    pointer()

    &:hover
      background v-bind(start_hover)
      bg()

    &:active
      background v-bind(start_active)
      bg()

  .load
    setTop(2)
    background v-bind(load)
    bg()
    cursor not-allowed

  .config
    setTop(3)
    background v-bind(config)
    bg()
    cursor not-allowed

  .extra
    setTop(4)
    background v-bind(extra)
    bg()
    pointer()

    &:hover
      background v-bind(extra_hover)
      bg()

    &:active
      background v-bind(extra_active)
      bg()

  .extra-disable
    setTop(4)
    background v-bind(extra_disable)
    bg()
    cursor not-allowed

  .exit
    setTop(5)
    background v-bind(exit)
    bg()
    pointer()

    &:hover
      background v-bind(exit_hover)
      bg()

    &:active
      background v-bind(exit_active)
      bg()
</style>
