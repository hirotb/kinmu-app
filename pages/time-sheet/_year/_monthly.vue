<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1> {{ work_month_str }} </h1>
      <p>monthly</p>
      <h1 class="title">
        nuxt-example1
      </h1>
      <h2 class="subtitle">
        this is nuxt sample project
      </h2>
      <div class="links">
        <nuxt-link to="/xxx/aaa">このサイトについて</nuxt-link>
        <Home v-if="!isLogin"/>
        <Mypage 
          v-if="isLogin" 
          :user="userData"/>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import firebase from '@/plugins/firebase'

export default {
  components: {
    AppLogo
  },
  //   computedの1段階よびはいけるが2段階予備は無理
  // URLからデータぱくってくるときはvalidate段階でdataに宣言しておいた変数に代入する
  validate({ params }) {
    // URLはyyyy/mmでないといけない trueを返すとページを出す。
    //ddの部分に01を仮で与えて、きちんと動くかチェックする。
    const work_day = new Date(params.year, params.monthly, '01')
    //console.log(work_day)
    //undefinedかnullでないこと
    const day_bool = !(work_day === undefined || work_day === null)
    return day_bool
    ///^\d+$/.testはRegex表現にtestで正規表現を試している
    //return /^\d+$/.test(params.ymd)
  },
  asyncData(context) {
    // コンポーネントをロードする前に毎回呼び出されます
    return { name: 'Hello, World！！', isLogin: false, userData: null }
  },
  fetch() {
    // `fetch` メソッドはページの描画前にストアを満たすために使用されます
  },
  computed: {
    work_month_str: function() {
      return this.$route.params.year + '-' + this.$route.params.monthly
    }
  },
  mounted: function() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      if (user) {
        this.isLogin = true
        this.userData = user
      } else {
        this.isLogin = false
        this.userData = null
      }
    })
  },
  methods: {
    googleLogin2: function() {
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
