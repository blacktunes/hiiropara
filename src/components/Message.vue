<template>
  <transition name="fade" @after-leave="end">
    <div class="message" @click="next" v-if="isShow">
      <img class="img" src="@/assets/images/empty.png" />
      <img class="message-bg" src="@/assets/images/message.png" />
      <img class="breakglyph" src="@/assets/images/breakglyph.png" />
      <div class="message-box">{{ list[index] }}</div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

const isShow = ref(false)

const emit = defineEmits(['exit', 'end'])

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

const show = () => {
  isShow.value = true
}

const hide = () => {
  isShow.value = false
}

const next = () => {
  if (++index.value >= list.length) {
    emit('exit')
    index.value = 0
  }
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
  font-size 24px
  color rgba(255,255,255,0.9)
  width 100%
  height 100%

  .img
    margin auto
    width 100%
    height 100%

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
    font-family cursive, auto
    position absolute
    left 15%
    right 15%
    bottom 5%
    top 80%
    color #fff
    text-shadow 0px 2px 2px rgba(0,0,0,0.7), 0 -2px 2px rgba(0,0,0,0.7), 2px 0 2px rgba(0,0,0,0.7), -2px 0 2px rgba(0,0,0,0.7)
</style>
