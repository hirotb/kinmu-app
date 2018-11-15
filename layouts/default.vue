<template>
  <div>
    <b-navbar 
      type="dark" 
      variant="primary" 
      toggleable>
      <b-navbar-toggle target="nav_dropdown_collapse"/>
      <b-collapse 
        id="nav_dropdown_collapse" 
        is-nav>
        <b-navbar-nav>
          <b-nav-item href="/">Home</b-nav-item>
          <b-nav-item :href="thisMonthHref">月別</b-nav-item>
          <b-nav-item :href="todayHref">日別</b-nav-item>
          <b-nav-item href="/config">設定</b-nav-item>
        </b-navbar-nav>
        <!-- ml-autoクラスでマージンを自動設定 -->
        <b-navbar-nav class="ml-auto">
          <LoginButton
            v-if="!isLogin"/>
          <LogoutButton 
            v-if="isLogin" 
            :user="userData"/>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- pages画面を表示する。 -->
    <nuxt />
  </div>
</template>

<script>
import LoginButton from '~/components/LoginButton.vue'
import LogoutButton from '~/components/LogoutButton.vue'
import firebase from '@/plugins/firebase'
import moment from 'moment'

export default {
  components: {
    LoginButton,
    LogoutButton
  },
  //サーバー側で処理を行う。
  //middleware: ['CheckAuth'],
  data() {
    return {
      show: true,
      name2: 'Hello, World！！',
      isLogin: false,
      userData: null
    }
  },
  computed: {
    todayObj: function() {
      return moment()
    },
    todayStr: function() {
      return this.todayObj.format('YYYY-MM-DD')
    },
    thisMonthStr: function() {
      return this.todayObj.format('YYYY-MM')
    },
    todayHref: function() {
      return '/time-sheet' + '/' + this.todayObj.format('YYYY/MM/DD')
    },
    thisMonthHref: function() {
      return '/time-sheet' + '/' + this.todayObj.format('YYYY/MM')
    },
    //これは値がおかしい
    thisMonthHref2: function() {
      return thisMonthStr + '/' + this.todayObj.format('YYYY/MM')
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
    onSubmit(evt) {
      //submitボタン
      evt.preventDefault()
      //let startTime = JSON.stringify(this.form)
      //console.log(startTime)
      //下のメソッドがよびだされない。
      console.log(this.form)
    }
  }
}
</script>
