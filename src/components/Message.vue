<template>
  <transition name="fade" @after-leave="end" @after-enter="start">
    <div class="message" @click="next" v-if="isShow">
      <img
        class="bg"
        :src="bg"
        :style="{ top: top + 'px', opacity: isBgShow ? 1 : 0 }"
        @load="loaded"
      />
      <transition name="slide-up" @after-enter="setBusy(false)">
        <div class="message-box" v-if="isShowMessageBox && msg">
          <img class="message-bg" src="@/assets/images/message.png" />
          <img class="breakglyph" src="@/assets/images/breakglyph.png" />
          <div class="message-text">{{ msg }}</div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { IMAGES } from '@/assets/scripts/preload'

const isShow = ref(false)
let busy = true

const emit = defineEmits(['exit', 'end'])

const isShowMessageBox = ref(false)
const isBgShow = ref(false)

const bg = ref('')
const top = ref(0)
const transition = ref('top 0s')
const msg = ref('')

let index = 0
const list = [
  {
    code: 100,
    data: '我喜欢Hiiro'
  },
  {
    code: 100,
    data: '曾经在教室里登B站账号的时候被看见了收藏夹然后被嘲笑。有一点点难过，但我什么也没有说'
  },
  {
    code: 100,
    data: '只是心里有一个小小的声音坚定地重复，我喜欢Hiiro'
  },
  {
    code: 100,
    data: '我喜欢Hiiro'
  },
  {
    code: 100,
    data: '我喜欢Hiiro健康的笑声，喜欢她温柔地说晚上好，喜欢她打游戏时认真的样子，喜欢她说"我是你们的baba"时屑屑的表情，喜欢她轻轻在我耳边告诉我，"我打你们啊"'
  },
  {
    code: 100,
    data: '我知道我喜欢Hiiro'
  },
  {
    code: 100,
    data: '我会在听到她的声音的时候情不自禁地露出微笑，会在她说晚安的时候依依不舍地听那一个留给我的mua，会在她身体不好的时候不由自主地牵挂不已'
  },
  {
    code: 100,
    data: '她是901IQ的甜菜，是425kg的debiiro，是星辰般闪着光的点亮我的生命的Hiiro'
  },
  {
    code: 100,
    data: '我知道也许我的同学们说的是对的'
  },
  {
    code: 100,
    data: '我永远不可能真正遇见那只给我以温暖的粉色猫猫'
  },
  {
    code: 100,
    data: '我知道也许有一天她会不再出现，像这个世界上很多平凡的人一样，结婚生子，然后慢慢变老'
  },
  {
    code: 100,
    data: '我知道那句我永远跟你们也许终究只会是一个美好的谎言，有一天她会离去，而我再也找不到那个如她的人'
  },
  {
    code: 100,
    data: '但是我并不在乎。因为我喜欢hiiro'
  },
  {
    code: 100,
    data: '所以我不在乎她是谁、她在哪里、曾有着怎样的经历，我只是单纯地相信在这个世界上有一个我在乎的人，正在温柔地陪着我度过日出日落'
  },
  {
    code: 100,
    data: '就像我固执地相信她真的是九岁的901IQ的粉色猫猫一样'
  },
  {
    code: 100,
    data: '也许三分钟前路灯闪烁的灯光照出她的影子，也许三千里外她正吃着她喜欢的三文鱼，但那又有什么关系呢？'
  },
  {
    code: 100,
    data: '至少此刻她陪着我，告诉我我是她喜欢的王牛奶，告诉我这个世界上有个人在乎我'
  },
  {
    code: 100,
    data: '所以我会在听见那声remember me时红了眼眶'
  },
  {
    code: 100,
    data: '我们此生不会相见，但我认识她有趣而温柔的灵魂，拥抱着她带给我的感动与温存'
  },
  {
    code: 100,
    data: '也许在岁月的尽头，在时间失去意义的尽头，我们会变成了宇宙间最微小的尘土，相伴着化为永恒'
  },
  {
    code: 100,
    data: '而这便已足够'
  },
  {
    code: 100,
    data: '因为我喜欢Hiiro'
  },
  {
    code: 300,
    data: () => {
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
    data: IMAGES.cg_1
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
          }, 2500)
        }, 2500)
      }, 1000)
    }
  },
  {
    code: 100,
    data: '(后面还没瞎编完)'
  }
]

const reset = () => {
  bg.value = ''
  transition.value = 'top 0s'
  top.value = 0
  msg.value = ''
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
  if (!(list?.[index]?.code)) {
    emit('exit')
    return
  }
  setEvent()
}

const setEvent = () => {
  switch (list[index].code) {
    case 100:
      // 显示文字
      isShowMessageBox.value = true
      msg.value = list[index].data
      break
    case 200:
      // 更换背景
      isBgShow.value = false
      transition.value = 'top 0s'
      top.value = 0
      bg.value = list[index].data
      break
    case 300:
      // 执行脚本
      list[index].data?.()
      break
  }
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
</script>

<style lang="stylus" scoped>
.message
  position relative
  background #fff
  font-size 30px
  color rgba(255,255,255,0.9)
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
      right:10%
      bottom 15%
      width 35px
      animation twinkle 0.5s alternate infinite

    .message-text
      font-family cursive, auto
      position absolute
      top 60px
      bottom 30px
      left 15%
      right 15%
      color #fff
      text-shadow 0px 2px 2px rgba(0,0,0,0.7), 0 -2px 2px rgba(0,0,0,0.7), 2px 0 2px rgba(0,0,0,0.7), -2px 0 2px rgba(0,0,0,0.7)
</style>
