<template>
  <transition
    name="fade"
    @after-leave="end"
    @after-enter="start"
  >
    <div
      class="message"
      @click="next"
      v-if="isShow"
    >
      <img
        class="bg"
        :src="bg"
        :style="{ top: top + 'px', opacity: isBgShow ? 1 : 0 }"
        @load="loaded"
      />
      <transition
        name="slide-up"
        @after-enter="setBusy(false)"
      >
        <div
          class="message-box"
          v-if="isShowMessageBox && msg"
        >
          <img
            class="message-bg"
            :src="IMAGES['message.webp']"
          />
          <img
            class="breakglyph"
            :src="IMAGES['breakglyph.webp']"
          />
          <div class="message-name">{{ name }}</div>
          <div
            class="message-text"
            v-html="msg"
          ></div>
        </div>
      </transition>
      <transition name="fade">
        <div
          class="choices-box"
          v-if="isChoicesShow"
        >
          <div
            class="item"
            v-for="(item, key) in choices"
            :key="key"
            @click="toLabel(item.label)"
          >
            <div class="text">{{ item.text }}</div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { IMAGES, AUDIOS } from '@/assets/scripts/preload'

const isShow = ref(false)
let busy = true

const emit = defineEmits(['exit', 'end'])

let extra = false

const isShowMessageBox = ref(false)
const name = ref('')
const msg = ref('')

const isBgShow = ref(false)
const bgColor = ref('#000')
const bg = ref(IMAGES['bg_00.webp'])
const top = ref(0)
const transition = ref('top 0s')

const isChoicesShow = ref(false)
const choices = ref([])

let index = 0
const list = [
  {
    code: 100,
    name: '王牛奶',
    data: '「没想到又忙到了这么晚」'
  },
  {
    code: 100,
    name: '王牛奶',
    data: '「终于可以回家陪<span style="color: pink">Hiiro</span>了」'
  },
  {
    code: 100,
    name: '王牛奶',
    data: '「Hiiro...Hiiro...寂しい」'
  },
  {
    code: 100,
    name: '王牛奶',
    data: '「说起来今天是<span style="color: pink">Hiiro</span>的生日呢」'
  },
  {
    code: 100,
    name: '王牛奶',
    data: '「那就去买点三文鱼吧」'
  },
  {
    code: 300,
    data: () => {
      busy = true
      isShowMessageBox.value = false
      isBgShow.value = false

      setTimeout(() => {
        bg.value = IMAGES['bg_01.webp']
        busy = false
      }, 500)
    }
  },
  {
    code: 100,
    name: 'SP',
    data: '「不好意思，今天的三文鱼已经卖光了」'
  },
  {
    code: 100,
    name: '王牛奶',
    data: '「啊……」'
  },
  {
    code: 100,
    name: '王牛奶',
    data: '「明天早点来多买点好了」'
  },
  {
    code: 100,
    name: '王牛奶',
    data: '「走小巷吧，快点回家陪家里的粉猫」'
  },
  {
    code: 300,
    data: () => {
      busy = true
      isShowMessageBox.value = false
      isBgShow.value = false

      setTimeout(() => {
        busy = false
        next()
      }, 600)
    }
  },
  {
    code: 100,
    name: '王牛奶',
    data: '「怎么好像有些奇怪的声音？」'
  },
  {
    code: 102,
    data: [
      {
        text: '你周围有其他人',
        label: '跳过'
      },
      {
        text: '你周围没有别人',
        label: '继续'
      }
    ]
  },
  {
    code: 100,
    data: '——在小巷的一个角落'
  },
  {
    code: 300,
    data: () => {
      extra = true
      localStorage.setItem('hiiropara-extra', 1)
      busy = true
      isShowMessageBox.value = false

      setTimeout(() => {
        busy = false
        next()
      }, 600)
    }
  },
  {
    code: 200,
    data: IMAGES['cg_1.webp']
  },
  {
    code: 300,
    data: () => {
      busy = true
      setTimeout(() => {
        transition.value = 'top 2s linear'
        top.value = -1206

        setTimeout(() => {
          top.value = -130

          setTimeout(() => {
            busy = false
            next()
          }, 2100)
        }, 2500)
      }, 1000)
    }
  },
  {
    code: 100,
    name: '王酸奶',
    data: '「没想到你最终还是落到了我的手上」'
  },
  {
    code: 100,
    name: 'Hiiro',
    data: '「你……你想干什么……」'
  },
  {
    code: 100,
    name: '王牛奶',
    data: '！！！？？'
  },
  {
    code: 100,
    name: '王牛奶',
    data: '「你在干嘛！」'
  },
  {
    code: 100,
    name: 'Hiiro',
    data: '「王牛奶！」'
  },
  {
    code: 100,
    name: '王酸奶',
    data: '「哦？原来你就是王牛奶」'
  },
  {
    code: 100,
    name: '王酸奶',
    data: '「没想到会以这种方式跟你见面」'
  },
  {
    code: 100,
    name: '王牛奶',
    data: '「你是……王酸奶！？」'
  },
  {
    code: 300,
    data: () => {
      busy = true
      isBgShow.value = false
      isShowMessageBox.value = false

      setTimeout(() => {
        busy = false
        next()
      }, 600)
    }
  },
  {
    code: 100,
    name: '咸鱼',
    data: '「还没等王牛奶反应过来，王酸奶就突然朝他冲了过去」'
  },
  {
    code: 100,
    name: '咸鱼',
    data: '「然后一个公主抱抱起了王牛奶，撒腿就跑」'
  },
  {
    code: 100,
    name: '咸鱼',
    data: '「最后他们幸福的生活在了一起~可喜可贺~可喜可贺~」'
  },
  {
    code: 100,
    name: 'Hiiro',
    data: '「哈？？？」'
  },
  {
    code: 100,
    name: '咸鱼',
    data: '「哦，我是旁白，当我不存在就好」'
  },
  {
    code: 100,
    name: 'Hiiro',
    data: '「哈？？？？？？？」'
  },
  {
    code: 300,
    data: () => {
      busy = true
      isShowMessageBox.value = false
      setTimeout(() => {
        isBgShow.value = false
        AUDIOS['我打你啊.mp3'].play()
        AUDIOS['我打你啊.mp3'].onended = () => {
          busy = false
          next()
        }
      }, 600)
    }
  },
  {},
  {
    code: 101,
    data: '跳过'
  },
  {
    code: 100,
    data: '那别看了'
  }
]

const reset = () => {
  busy = true

  isShowMessageBox.value = false
  name.value = ''
  msg.value = ''

  isBgShow.value = false
  bgColor.value = '#000'
  bg.value = IMAGES['bg_00.webp']
  top.value = 0
  transition.value = 'top 0s'

  isChoicesShow.value = false
  choices.value = []

  index = 0
}

const show = () => {
  reset()
  isShow.value = true
}

const start = () => {
  isShowMessageBox.value = true
  setEvent()
}

const hide = () => {
  isShow.value = false
}

const next = () => {
  if (busy) return
  ++index
  if (!list?.[index]?.code) {
    emit('exit', extra)
    return
  }
  setEvent()
}

const setEvent = () => {
  switch (list[index].code) {
    case 100:
      // 显示文字
      isShowMessageBox.value = true
      name.value = list[index].name
      msg.value = list[index].data
      break
    case 101:
      // 标签
      next()
      break
    case 102:
      // 显示选项
      busy = true
      isShowMessageBox.value = false
      choices.value = list[index].data
      isChoicesShow.value = true
      break
    case 200:
      // 更换背景
      isBgShow.value = false
      transition.value = 'top 0s'
      top.value = 0
      bg.value = list[index].data
      next()
      break
    case 300:
      // 执行脚本
      list[index].data?.()
      break
    default:
      next()
      break
  }
}

const toLabel = (label) => {
  isChoicesShow.value = false
  const _index = list.findIndex((item) => item.code === 101 && item.data === label)
  if (_index === -1) {
    next()
  } else {
    index = _index
    setEvent()
  }
  busy = false
}

const setBusy = (flag) => {
  busy = !!flag
}

const loaded = () => {
  isBgShow.value = true
  next()
}

const end = () => {
  emit('end')
}

defineExpose({ show, hide, next })

/* eslint-disable */
const select = computed(() => `url('${IMAGES['select.webp']}')`)
const select_hover = computed(() => `url('${IMAGES['select_hover.webp']}')`)
const select_active = computed(() => `url('${IMAGES['select_active.webp']}')`)
/* eslint-enable */
</script>

<style lang="stylus" scoped>
@import '@/assets/style/fn.styl'

.message
  position relative
  background v-bind(bgColor)
  color rgba(255, 255, 255, 0.9)
  width 100%
  height 100%

  .bg
    position absolute
    top 0
    left 0
    width 100%
    opacity 0
    transition opacity 0.5s, v-bind(transition)

  .message-box
    position absolute
    left 0
    bottom 0
    width 100%
    height 211px

    .message-bg
      position absolute
      left 0
      bottom 0
      width 100%

    .breakglyph
      position absolute
      right 15%
      bottom 15%
      width 35px
      animation twinkle 0.5s alternate infinite

    .message-name
      position absolute
      top 30px
      left 20%
      right 20%
      color #ffb911
      text-shadow 0px 4px 4px rgba(0, 0, 0, 0.7), 0 -4px 4px rgba(0, 0, 0, 0.7), 4px 0 4px rgba(0, 0, 0, 0.7), -4px 0 4px rgba(0, 0, 0, 0.7)
      font-size 35px

    .message-text
      position absolute
      top 80px
      bottom 30px
      left 20%
      right 20%
      color #fff
      text-shadow 0px 2px 2px rgba(0, 0, 0, 0.7), 0 -2px 2px rgba(0, 0, 0, 0.7), 2px 0 2px rgba(0, 0, 0, 0.7), -2px 0 2px rgba(0, 0, 0, 0.7)
      font-size 24px

  .choices-box
    position absolute
    left 50%
    top 40%
    transform translate(-50%, -50%)
    width 65%
    height 60%
    display flex
    flex-direction column
    justify-content center

    .item
      display flex
      justify-content center
      align-items center
      background v-bind(select)
      bg()
      pointer()
      padding 5px
      height 60px
      margin 30px 0

      &:hover
        background v-bind(select_hover)
        bg()

      &:active
        background v-bind(select_active)
        bg()

      .text
        font-size 20px
        color #fff
        text-shadow 0px 2px 2px rgba(0, 0, 0, 0.7), 0 -2px 2px rgba(0, 0, 0, 0.7), 2px 0 2px rgba(0, 0, 0, 0.7), -2px 0 2px rgba(0, 0, 0, 0.7)
</style>
