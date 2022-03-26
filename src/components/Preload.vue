<template>
  <div style="display:none">
    <img v-for="(url, key) in list" :key="key" :src="url" @load="setReady" />
  </div>
  <div class="loading" v-if="isShow">
    <img class="img" :src="bg" />
    <div class="text">
      <div class="line-1" v-if="!ready">预加载中</div>
      <div class="line-2" v-if="!ready">({{ loadedNum }}/{{ list.length }})</div>
      <div class="line-1" v-else>加载完成了</div>
      <div class="line-2" v-if="!ready">(其实跳过也行)</div>
    </div>
    <div class="btn" @click="start">开始涩猫</div>
    <div class="tip">(界面有点丑，先用着)</div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const emit = defineEmits(['start'])

const isShow = ref(true)
const list = ref([])
const loadedNum = ref(0)
const ready = computed(() => loadedNum.value >= list.value.length)

const bg = process.env.NODE_ENV === 'development' ? require('@/assets/images/bg.png') : 'https://cdn.jsdelivr.net/gh/blacktunes/hiiropara@master/src/assets/images/bg.png'

const temp = require.context('@/assets/images', false, /.png$/i).keys().map(item => {
  return item.substring(2)
})

temp.forEach(item => {
  if (['bg.png'].includes(item.toLocaleLowerCase())) return

  if (['extra_bg.png'].includes(item.toLocaleLowerCase())) {
    list.value.push(process.env.NODE_ENV === 'development' ? require(`@/assets/images/${item}`) : `https://cdn.jsdelivr.net/gh/blacktunes/hiiropara@master/src/assets/images/${item}`)
  } else {
    list.value.push(require('@/assets/images/' + item))
  }
})

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

  .text
    position absolute
    left 50%
    top 30%
    transform translateX(-50%)
    font-size 36px
    text-align center

    .line-2
      font-size 24px

  .btn
    position absolute
    left 50%
    bottom 30%
    transform translateX(-50%)
    font-size 24px
    text-align center
    padding 15px 20px
    border-radius 10px
    background #662211
    color #fff
    pointer()

    &:hover
      background #cc6644

    &:active
      background #ffb911

  .tip
    position absolute
    left 50%
    bottom 20px
    transform translateX(-50%)
    font-size 16px
</style>
