<template>
  <b-button @click="googleLogin">googleでログイン</b-button>
</template>

<script>
import firebase from '@/plugins/firebase'
export default {
  name: 'LoginButton',
  methods: {
    googleLogin: function() {
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    }
  }
}
</script>
