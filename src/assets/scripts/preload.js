import { reactive } from 'vue'

const IMAGES = reactive({})
const imagesCdnFiles = ['bg', 'title_bg', 'brandlogo', 'cg_1']

const temp = require.context('@/assets/images', false, /.(png|jpg)$/i).keys().map(item => {
  return item.substring(2)
})

temp.forEach((item, index) => {
  // if (['bg.png'].includes(item.toLocaleLowerCase())) return

  const _index = imagesCdnFiles.indexOf(item.split('.')[0].toLocaleLowerCase())
  if (_index !== -1) {
    IMAGES[imagesCdnFiles[_index]] = process.env.NODE_ENV === 'development' ? require(`@/assets/images/${item}`) : `https://cdn.jsdelivr.net/gh/blacktunes/hiiropara@master/src/assets/images/${item}`
  } else {
    IMAGES[index] = require('@/assets/images/' + item)
  }
})

const AUDIOS = reactive({})
const audiosCdnFiles = ['喵', '我打你啊']

audiosCdnFiles.forEach(item => {
  AUDIOS[item] = new Audio(process.env.NODE_ENV === 'development' ? require(`@/assets/voices/${item}.mp3`) : `https://cdn.jsdelivr.net/gh/blacktunes/hiiropara@master/src/assets/voices/${item}.mp3`)
})

export { IMAGES, AUDIOS }
