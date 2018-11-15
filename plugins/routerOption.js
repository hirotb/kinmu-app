//vuerouterをつかって遷移時に行う処理をいれる

// export default async ({ app }) => {
//   app.router.afterEach((to, from) => {
//     // ページ遷移ごとに行いたい処理
//     console.log('遷移')
//   })
// }
import firebase from 'firebase'
//ユーザー情報を取得するには各ページにユーザー認証情報出すようにmetaつける？
export default async ({ app }) => {
  app.router.afterEach((to, from) => {
    // ページ遷移ごとに行いたい処理
    console.log('遷移')
    // ルート認証があるかチェック
    //if (to.matched.some((rec = rec.meta.requiresAuth))) {
    // ユーザログインのチェック
    let user = firebase.auth().currentUser
    console.log('ユーザ認証チェック', user)
    if (!user) {
      next()
    } else {
      next({
        name: 'Signin' //今回は書いていないが、Signinコンポーネントに飛ぶ
      })
    }
    // }
    //  else {
    //   // ルートの認証を設定していない場合はこっち
    //   next()
    // }
  })
}

// import Vue from 'vue'
//import firebase from 'firebase'

// import Router from 'vue-router'

// Vue.use(Router)

// const router = new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: home,
//       meta: {
//         requiresAuth: true
//       }
//     }
//   ]
// })

// // ここがルートガード
// router.beforeEach((to, from, next) => {
//   // ルート認証があるかチェック
//   if (to.matched.some((rec = rec.meta.requiresAuth))) {
//     // ユーザログインのチェック
//     let user = firebase.auth().currentUser
//     console.log('ユーザ認証チェック')
//     if (user) {
//       next()
//     } else {
//       next({
//         name: 'Signin' //今回は書いていないが、Signinコンポーネントに飛ぶ
//       })
//     }
//   } else {
//     // ルートの認証を設定していない場合はこっち
//     next()
//   }
// })
// export default router
