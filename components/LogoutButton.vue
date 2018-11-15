<template>
  <div id="logout">
    <b-navbar-brand>{{ user.displayName }}</b-navbar-brand>
    <b-button @click="logout">ログアウト</b-button>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
export default {
  name: 'LogoutButton',
  //型がいるprops: ['user']   →props: {  status: String}
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data(context) {
    // コンポーネントをロードする前に毎回呼び出されます
    return { note_content: 'hello', notes: [] }
  },
  created: function() {
    firebase
      .database()
      .ref('notes/' + this.user.uid)
      .once('value')
      .then(result => {
        if (result.val()) {
          this.notes = result.val()
        }
      })
  },
  methods: {
    logout: function() {
      firebase.auth().signOut()
    }
  }
}
</script>
