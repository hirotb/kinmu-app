//webpack化しないとだめ
import firebase from 'firebase'

if (!firebase.apps.length) {
  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyBDZa5t8BYAy-cM8XwwG8NJWbVGqiVrf4A',
    authDomain: 'nuxt-app1.firebaseapp.com',
    databaseURL: 'https://nuxt-app1.firebaseio.com',
    projectId: 'nuxt-app1',
    storageBucket: 'nuxt-app1.appspot.com',
    messagingSenderId: '26548269277'
  }
  firebase.initializeApp(config)
}

export default firebase
