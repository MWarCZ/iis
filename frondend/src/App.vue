<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/films">Filmy</router-link> |
      <router-link to="/cinemas">Kina</router-link> |
      <router-link to="/about">HokusPokus</router-link> |

      <template v-if="store.user === undefined">
        <!--<router-link to="/login">Přihlasit se</router-link>-->
        <a href="#" @click="loginVisible = true">Přihlásit se</a>
      </template>
      <template v-else>
        <router-link to="/myaccount">Můj účet</router-link> |
        <a href="#" @click="logout()">Odhlásit se</a>
      </template>

      <Dialog v-if="loginVisible" @close="loginVisible = false">
        <h1>Přihlášení:</h1>
        <Login @success="loginVisible = false; " />
      </Dialog>

    </div>

    <keep-alive include="FilmsPage">
      <router-view/>
    </keep-alive>
    <!--<router-view />-->
  </div>
</template>

<script>
import Dialog from '@/components/Dialog.vue'
import Login from '@/components/Login.vue'
import store from '@/utils/Store.js'

export default {
  name: 'App',
  components: {
    Dialog,
    Login
  },
  data: function () {
    return {
      loginVisible: false,
      store: store
    }
  },
  created: function () {
    this.store.load()
  },
  methods: {
    logout: function () {
      this.store.user = undefined
      this.store.save()
      console.log('localStorage', localStorage)
      this.$router.push('/')
    }
  }
}

</script>

<style lang="less">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
