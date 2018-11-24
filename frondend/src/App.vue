<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/films">Filmy</router-link> |
      <router-link to="/cinemas">Kina</router-link> |
      <router-link to="/about">HokusPokus</router-link> |

      <template v-if="$myStore.user !== undefined">
        <router-link to="/myaccount">Můj účet</router-link> |
      </template>

      <template v-if="$myStore.worker !== undefined">
        <router-link to="/sell">Prodej</router-link> |
      </template>

      <template v-if="$myStore.user === undefined && $myStore.worker === undefined">
        <!--<router-link to="/login">Přihlasit se</router-link>-->
        <a href="#" @click="loginVisible = true">Přihlásit se</a>
      </template>
      <template v-else>
        <a href="#" @click="logout()">Odhlásit se</a>
      </template>

      <Dialog v-if="loginVisible" @close="loginVisible = false">
        <h1>Přihlášení:</h1>
        <Login @success="loginVisible = false; " />
        <h1>Registrace:</h1>
        <Register />
        <a href="#" v-b-toggle="'worker_login'">
          Vstup pro zaměstance
        </a>
        <b-collapse id="worker_login">
          <h2>Přihlášení zaměstance:</h2>
          <WorkerLogin @success="loginVisible = false; " />
        </b-collapse>
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
import Register from '@/components/Register.vue'
import WorkerLogin from '@/components/WorkerLogin.vue'
// import store from '@/utils/Store.js'

export default {
  name: 'App',
  components: {
    Dialog,
    Login,
    Register,
    WorkerLogin
  },
  data: function () {
    return {
      loginVisible: false
    }
  },
  created: function () {
    this.$myStore.load()
  },
  methods: {
    logout: function () {
      this.$myStore.user = undefined
      this.$myStore.worker = undefined
      this.$myStore.save()
      this.$router.push('/')
      this.$forceUpdate()
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
