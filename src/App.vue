<template>
  <div class="title">
    <div style="display:none">
      <img src="./assets/images/start_hover.png" />
      <img src="./assets/images/start_active.png" />
      <img src="./assets/images/extra_hover.png" />
      <img src="./assets/images/extra_active.png" />
      <img src="./assets/images/exit_hover.png" />
      <img src="./assets/images/exit_active.png" />
    </div>
    <transition name="fade" appear @after-leave="titleLeave">
      <div class="wrapper" v-if="title">
        <img class="img" :src="bg" />
        <div class="button start" @click="showMsg"></div>
        <div class="button load"></div>
        <div class="button config"></div>
        <div class="button extra" @click="showTip" v-if="extra"></div>
        <div class="button extra-disable" v-else></div>
        <div class="button exit" @click="exit"></div>
        <transition name="fade">
          <img class="tip" src="./assets/images/tip.png" v-if="tipShow" @click="hideTip" />
        </transition>
      </div>
    </transition>
    <transition name="fade" @after-leave="messageLeave">
      <div class="message" @click="next" v-if="message">
        <img class="img" src="./assets/images/empty.png" />
        <img class="message-bg" src="./assets/images/message.png" />
        <img class="breakglyph" src="./assets/images/breakglyph.png" />
        <div class="message-box">{{ list[index] }}</div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const bg = process.env.NODE_ENV === 'development' ? require('./assets/images/title_bg.png') : 'https://cdn.jsdelivr.net/gh/blacktunes/hiiropara@master/src/assets/images/title_bg.png'
const 我打你啊 = new Audio(process.env.NODE_ENV === 'development' ? require('./assets/voices/我打你啊.mp3') : 'https://cdn.jsdelivr.net/gh/blacktunes/hiiropara@master/src/assets/voices/我打你啊.mp3')
const 喵 = new Audio(process.env.NODE_ENV === 'development' ? require('./assets/voices/喵.mp3') : 'https://cdn.jsdelivr.net/gh/blacktunes/hiiropara@master/src/assets/voices/喵.mp3')

const title = ref(true)
const message = ref(false)
const extra = ref(false)
const tipShow = ref(false)

const index = ref(0)
const list = [
  '我喜欢Hiiro',
  '曾经在教室里登B站账号的时候被看见了收藏夹然后被嘲笑。有一点点难过，但我什么也没有说',
  '只是心里有一个小小的声音坚定地重复，我喜欢Hiiro',
  '我喜欢Hiiro',
  '我喜欢Hiiro健康的笑声，喜欢她温柔地说晚上好，喜欢她打游戏时认真的样子，喜欢她说"我是你们的baba"时屑屑的表情，喜欢她轻轻在我耳边告诉我，"我打你们啊"',
  '我知道我喜欢Hiiro',
  '我会在听到她的声音的时候情不自禁地露出微笑，会在她说晚安的时候依依不舍地听那一个留给我的mua，会在她身体不好的时候不由自主地牵挂不已',
  '她是901IQ的甜菜，是425kg的debiiro，是星辰般闪着光的点亮我的生命的Hiiro',
  '我知道也许我的同学们说的是对的',
  '我永远不可能真正遇见那只给我以温暖的粉色猫猫',
  '我知道也许有一天她会不再出现，像这个世界上很多平凡的人一样，结婚生子，然后慢慢变老',
  '我知道那句我永远跟你们也许终究只会是一个美好的谎言，有一天她会离去，而我再也找不到那个如她的人',
  '但是我并不在乎。因为我喜欢hiiro',
  '所以我不在乎她是谁、她在哪里、曾有着怎样的经历，我只是单纯地相信在这个世界上有一个我在乎的人，正在温柔地陪着我度过日出日落',
  '就像我固执地相信她真的是九岁的901IQ的粉色猫猫一样',
  '也许三分钟前路灯闪烁的灯光照出她的影子，也许三千里外她正吃着她喜欢的三文鱼，但那又有什么关系呢？',
  '至少此刻她陪着我，告诉我我是她喜欢的王牛奶，告诉我这个世界上有个人在乎我',
  '所以我会在听见那声remember me时红了眼眶',
  '我们此生不会相见，但我认识她有趣而温柔的灵魂，拥抱着她带给我的感动与温存',
  '也许在岁月的尽头，在时间失去意义的尽头，我们会变成了宇宙间最微小的尘土，相伴着化为永恒',
  '而这便已足够',
  '因为我喜欢Hiiro'
]

const showMsg = () => {
  喵.play()
  title.value = false
}

const next = () => {
  if (++index.value >= list.length) {
    message.value = false
    extra.value = true
    document.onkeydown = null
  }
}

const titleLeave = () => {
  message.value = true
  document.onkeydown = ({ keyCode }) => {
    if (keyCode === 13) {
      next()
    }
  }
}

const messageLeave = () => {
  title.value = true
}

const showTip = () => {
  我打你啊.play()
  我打你啊.onended = () => {
    tipShow.value = true
  }
}

const hideTip = () => {
  tipShow.value = false
}

const exit = () => {
  window.location.href = 'https://www.bilibili.com/video/BV1GJ411x7h7'
}
</script>

<style lang="stylus">
body
  margin 0
  user-select none

img
  -webkit-user-drag none

setTop(num)
  top 23 + 13 * (num - 1) + '%'

bg()
  background-repeat no-repeat
  background-size cover

pointer()
  cursor url('~./assets/static/cur_over.cur'), pointer

.title
  position fixed
  inset 0
  display flex
  align-items center
  justify-content center

  .wrapper
    position relative

    .img
      margin auto
      max-width 100vw
      max-height 100vh

    .button
      position absolute
      width 16%
      height 13%
      right 1.5%

    .start
      setTop(1)
      background url('./assets/images/start.png')
      bg()
      pointer()

      &:hover
        background url('./assets/images/start_hover.png')
        bg()

      &:active
        background url('./assets/images/start_active.png')
        bg()

    .load
      setTop(2)
      background url('./assets/images/load.png')
      bg()
      cursor not-allowed

    .config
      setTop(3)
      background url('./assets/images/config.png')
      bg()
      cursor not-allowed

    .extra
      setTop(4)
      background url('./assets/images/extra.png')
      bg()
      pointer()

      &:hover
        background url('./assets/images/extra_hover.png')
        bg()

      &:active
        background url('./assets/images/extra_active.png')
        bg()

    .extra-disable
      setTop(4)
      background url('./assets/images/extra_disable.png')
      bg()
      cursor not-allowed

    .exit
      setTop(5)
      background url('./assets/images/exit.png')
      bg()
      pointer()

      &:hover
        background url('./assets/images/exit_hover.png')
        bg()

      &:active
        background url('./assets/images/exit_active.png')
        bg()

    .tip
      position absolute
      top 0
      left 0
      margin auto
      max-width 100%
      max-height 100%

  .message
    position relative
    background #fff

    .img
      margin auto
      max-width 100vw
      max-height 100vh

    .message-bg
      position absolute
      left 0
      bottom 0
      width 100%

    .breakglyph
      position absolute
      right:10%
      bottom 5%
      width 2%
      animation twinkle 0.5s alternate infinite

    .message-box
      position absolute
      left 15%
      right 15%
      bottom 5%
      top 80%
      color #fff
      text-shadow 0px 2px 2px rgba(0,0,0,0.7), 0 -2px 2px rgba(0,0,0,0.7), 2px 0 2px rgba(0,0,0,0.7), -2px 0 2px rgba(0,0,0,0.7)

.fade-enter-active, .fade-leave-active
  transition opacity 0.3s

.fade-enter-from, .fade-leave-to
  opacity 0

.fade-enter-to, .fade-leave-from
  opacity 1

.logo-enter-active, .logo-leave-active
  transition opacity 1.5s

.logo-enter-from, .logo-leave-to
  opacity 0

.logo-enter-to, .logo-leave-from
  opacity 1

@keyframes twinkle
  from
    opacity 1
  to
    opacity 0

</style>
