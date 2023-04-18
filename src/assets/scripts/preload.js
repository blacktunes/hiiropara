import { reactive } from 'vue'

const imagesCdn = {
  bg: 'https://s1.ax1x.com/2023/04/18/p9imleU.jpg',
  bg_00: 'https://s1.ax1x.com/2023/04/18/p9imdOK.jpg',
  bg_01: 'https://s1.ax1x.com/2023/04/18/p9imDTe.jpg',
  title_bg: 'https://s1.ax1x.com/2023/04/18/p9imBwD.jpg',
  brandlogo: 'https://s1.ax1x.com/2023/04/18/p9imyYd.jpg',
  cg_1: 'https://s1.ax1x.com/2023/04/18/p9imsFH.jpg',
  message: 'https://s1.ax1x.com/2023/04/18/p9im0eO.png',
  title: 'https://s1.ax1x.com/2023/04/18/p9im6fA.jpg'
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
