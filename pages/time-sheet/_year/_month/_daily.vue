<template>
  <div>
    <LoginButton v-if="!isLogin"/>
    <LogoutButton 
      v-if="isLogin" 
      :user="userData"/>
    <h1> {{ work_day_str }} </h1>
    <b-form 
      v-if="show" 
      @submit="onSubmit" 
      @reset="onReset">
      <!-- 開始時間 -->
      <b-form-group 
        id="startTimeInputGroup"
        label="開始時間"
        label-for="startTimeInput"
        description="開始時刻を打て">
        <b-form-input 
          id="startTimeInput"
          v-model="form.startTime"
          type="time"
          required/>
      </b-form-group>
      <!-- 終了 -->
      <b-form-group 
        id="endTimeInputGroup"
        label="終了時刻"
        label-for="endTimeInput"
        description="終了時刻を打て">
        <b-form-input 
          id="endTimeInput"
          v-model="form.endTime"
          type="time"
          required/>
      </b-form-group>
      <!-- -->
      <b-form-group 
        id="breakTimeInputGroup"
        label="休憩時間"
        label-for="breakTimeInput"
        description="休憩時間を打て">
        <b-form-input 
          id="breakTimeeInput"
          v-model="form.breakTime"
          type="time"
          required/>
      </b-form-group>
      <!-- 勤務時間を計算表示 -->
      <b-button 
        type="submit" 
        variant="primary">Submit</b-button>
      <b-button 
        type="reset" 
        variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>
<script>
import LoginButton from '~/components/LoginButton.vue'
import LogoutButton from '~/components/LogoutButton.vue'
import firebase from '@/plugins/firebase'

//後でここはDBの個人設定から取得
const START_TIME = '09:00'
const END_TIME = '18:00'
const BREAK_TIME = '01:00'
export default {
  components: {
    LoginButton,
    LogoutButton
  },
  //   computedの1段階よびはいけるが2段階予備は無理
  // URLからデータぱくってくるときはvalidate段階でdataに宣言しておいた変数に代入する
  validate({ params }) {
    // URLはyyyy/mm/ddでないといけない trueを返すとページを出す。
    const work_day = new Date(params.year, params.month, params.daily)
    //console.log(work_day)
    //undefinedかnullでないこと
    const day_bool = !(work_day === undefined || work_day === null)

    return day_bool
    ///^\d+$/.testはRegex表現にtestで正規表現を試している
    //return /^\d+$/.test(params.ymd)
  },
  // コンポーネントをロードする前に毎回呼び出されます
  // asyncData(context) {
  //   return { name: 'Hello, World！！', isLogin: false, userData: null }
  // },
  //ユーザー defaultがなぜか必要
  // props: {
  //   user: {
  //     type: String,
  //     required: false,
  //     default: 'aaa'
  //   }
  // },
  data() {
    return {
      form: {
        startTime: START_TIME,
        endTime: END_TIME,
        breakTime: BREAK_TIME
      },
      show: true
    }
  },
  computed: {
    work_day_str: function() {
      return (
        this.$route.params.year +
        '-' +
        this.$route.params.month +
        '-' +
        this.$route.params.daily
      )
    },
    userData: function() {
      return firebase.auth().currentUser
    }
  },
  // mounted: function() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     console.log(user)
  //     if (user) {
  //       this.isLogin = true
  //       this.userData = user
  //     } else {
  //       this.isLogin = false
  //       this.userData = null
  //     }
  //   })
  // },
  methods: {
    onSubmit(evt) {
      //submitボタン
      evt.preventDefault()
      //下のメソッドがよびだされない。
      console.log(this.form)
      //this.saveContent(this.form.startTime)
      this.saveContent(this.form)
    },
    onReset(evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.startTime = START_TIME
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    saveContent: function(value) {
      // 新しいテキストのためのキーを取得
      //notes/uid(ユーザID)/notekey(セッションキー)/content:value
      // var newNoteKey = firebase
      //   .database()
      //   .ref()
      //   .child('notes')
      //   .push().key
      // firebase
      //   .database()
      //   .ref('notes/' + this.userData.uid + '/' + newNoteKey)
      //   .set({ content: value })
      firebase
        .database()
        .ref(this.userData.uid + '/' + 'daily' + '/' + '2018-08-29')
        .set(value)
    }
  }
}
// export default {
//   name: 'LogoutButton',
//   //型がいるprops: ['user']   →props: {  status: String}
//   props: {
//     user: {
//       type: String,
//       required: true
//     }
//   },
//   data(context) {
//     // コンポーネントをロードする前に毎回呼び出されます
//     return { note_content: 'hello', notes: [] }
//   },
//   created: function() {
//     firebase
//       .database()
//       .ref('notes/' + this.user.uid)
//       .once('value')
//       .then(result => {
//         if (result.val()) {
//           this.notes = result.val()
//         }
//       })
//   },
//   methods: {
//     logout: function() {
//       firebase.auth().signOut()
//     },

//     saveContent: function(value) {
//       // 新しいテキストのためのキーを取得
//       //notes/uid(ユーザID)/notekey(セッションキー)/content:value
//       var newNoteKey = firebase
//         .database()
//         .ref()
//         .child('notes')
//         .push().key
//       firebase
//         .database()
//         .ref('notes/' + this.user.uid + '/' + newNoteKey)
//         .set({ content: value })
//     }
//   }
// }
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
