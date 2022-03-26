<template>
  <div style="display:none">
    <img v-for="(url, key) in list" :key="key" :src="url" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const list = ref([])

const temp = require.context('@/assets/images', false, /.png$/i).keys().map(item => {
  return item.substring(2)
})

temp.forEach(item => {
  if (['title_bg.png', 'brandlogo.png'].includes(item.toLocaleLowerCase())) return

  if (['extra_bg.png'].includes(item.toLocaleLowerCase())) {
    list.value.push(process.env.NODE_ENV === 'development' ? require(`@/assets/images/${item}`) : `https://cdn.jsdelivr.net/gh/blacktunes/hiiropara@master/src/assets/images/${item}`)
  } else {
    list.value.push(require('@/assets/images/' + item))
  }
})
</script>
