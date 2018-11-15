<template>
  <section class="container">
    <div>
      <applogo/>
      <h1 class="title">
        kinmu-app
      </h1>
      <h2 class="subtitle">
        kinmu-app is Time Sheet App
      </h2>
      <b-nav class="index-nav">
        <b-nav-item active><nuxt-link to="/about">日別</nuxt-link></b-nav-item>
        <b-nav-item> <nuxt-link to="/about">月別</nuxt-link></b-nav-item>
        <b-nav-item disabled><nuxt-link to="/config">設定</nuxt-link></b-nav-item>
      </b-nav>
    </div>
  </section>
</template>
/* 各ページにジャンプするアンカー作る。 */
<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  }
}
</script>

<style>
.index-nav {
  font-size: 30px;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
