import { reactive, ref } from 'vue'

const imagesCdn = {}
const imagesCdnFiles = Object.keys(imagesCdn)

const IMAGES = reactive({})

const imageTemp = require
  .context('@/assets/images', false, /.(webp)$/i)
  .keys()
  .map((item) => {
    return item.substring(2)
  })

imageTemp.forEach((key) => {
  const index = imagesCdnFiles.indexOf(key.toLocaleLowerCase())

  if (index !== -1) {
    IMAGES[imagesCdnFiles[index]] = imagesCdn[imagesCdnFiles[index]]
  } else {
    IMAGES[key] = require(`@/assets/images/${key}`)
  }
})

const AUDIOS = reactive({})

const audioTemp = require
  .context('@/assets/voices', false, /.(mp3)$/i)
  .keys()
  .map((item) => {
    return item.substring(2)
  })

audioTemp.forEach((key) => {
  AUDIOS[key] = require(`@/assets/voices/${key}`)
})

const progress = ref([0, 0])
progress.value[1] = Object.keys(IMAGES).length + Object.keys(AUDIOS).length

const getCache = (url) => {
  return new Promise((resolve) => {
    fetch(url)
      .then((res) =>
        res.blob().then(async (blob) => {
          resolve(URL.createObjectURL(blob))
        })
      )
      .catch(() => {
        resolve()
      })
  })
}

const setup = async () => {
  for (const key in IMAGES) {
    if (imagesCdnFiles.includes(key.toLocaleLowerCase())) {
      const img = new Image()
      img.src = IMAGES[key]
      img.onload = () => {
        ++progress.value[0]
      }
    } else if (!IMAGES[key].startsWith('data:image')) {
      IMAGES[key] = (await getCache(IMAGES[key])) || IMAGES[key]
      ++progress.value[0]
    } else {
      ++progress.value[0]
    }
  }
  for (const key in AUDIOS) {
    AUDIOS[key] = new Audio(AUDIOS[key])
    AUDIOS[key].oncanplay = () => {
      ++progress.value[0]
    }
  }
}
setup()

export { IMAGES, AUDIOS, progress }
