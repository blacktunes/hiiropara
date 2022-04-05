import { reactive } from 'vue'

const IMAGES = reactive({})
const imagesCdnFiles = ['bg', 'bg_00', 'bg_01', 'title_bg', 'brandlogo', 'cg_1']

const temp = require.context('@/assets/images', false, /.(png|jpg)$/i).keys().map(item => {
  return item.substring(2)
})

temp.forEach((item, index) => {
  // if (['bg.png'].includes(item.toLocaleLowerCase())) return

  const _index = imagesCdnFiles.indexOf(item.split('.')[0].toLocaleLowerCase())
  if (_index !== -1) {
    IMAGES[imagesCdnFiles[_index]] = require(`@/assets/images/${item}`)
  } else {
    IMAGES[index] = require('@/assets/images/' + item)
  }
})

const AUDIOS = reactive({})
const audiosCdnFiles = ['喵', '我打你啊']

audiosCdnFiles.forEach(item => {
  AUDIOS[item] = new Audio(require(`@/assets/voices/${item}.mp3`))
})

export { IMAGES, AUDIOS }
