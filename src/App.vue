<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <router-link to="/">首页</router-link>&nbsp;&nbsp;&nbsp;&nbsp;
    <router-link to="/second">第二个页面</router-link>
    <router-view class="iwu-route"></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
