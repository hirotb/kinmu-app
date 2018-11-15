import firebase from '@/plugins/firebase'
import VueRouter from 'vue-router'
import Vue from 'vue'

export default function({ route }) {
  console.log('サンプルミドルウェア', route.path)
  var user = firebase.auth().currentUser
  console.log('ユーザー', user)
}
