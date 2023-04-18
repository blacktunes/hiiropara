import { reactive } from 'vue'

const imagesCdn = {
  bg: 'https://i.postimg.cc/2jZVhspt/bg.jpg',
  bg_00: 'https://i.postimg.cc/QtRCvb7S/bg-00.jpg',
  bg_01: 'https://i.postimg.cc/mg8DTRMP/bg-01.jpg',
  title_bg: 'https://i.postimg.cc/VLP5RKmk/title-bg.jpg',
  brandlogo: 'https://i.postimg.cc/cJLv36Z7/brandlogo.jpg',
  cg_1: 'https://i.postimg.cc/nr4Fgtpc/cg-1.jpg'
}
const imagesCdnFiles = Object.keys(imagesCdn)

const IMAGES = reactive({})

const temp = require.context('@/assets/images', false, /.(png|jpg)$/i).keys().map(item => {
  return item.substring(2)
})

temp.forEach((item, index) => {
  const _index = imagesCdnFiles.indexOf(item.split('.')[0].toLocaleLowerCase())

  if (_index !== -1) {
    IMAGES[imagesCdnFiles[_index]] = imagesCdn[imagesCdnFiles[_index]]
  } else {
    IMAGES[index] = require(`@/assets/images/${item}`)
  }
})

const AUDIOS = reactive({})
const audiosCdnFiles = ['喵', '我打你啊']

audiosCdnFiles.forEach(item => {
  AUDIOS[item] = new Audio(require(`@/assets/voices/${item}.mp3`))
})

export { IMAGES, AUDIOS }
