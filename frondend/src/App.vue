<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/films">Filmy</router-link> |
      <router-link to="/cinemas">Kina</router-link> |
      <router-link to="/about">HokusPokus</router-link> |

      <template v-if="!!$myStore.worker && $myStore.worker.access >= 3">
        <router-link to="/workers">Správa pracovníků</router-link> |
      </template>

      <template v-if="$myStore.user !== undefined">
        <router-link to="/myaccount">Můj účet</router-link> |
      </template>
<!--
      <template v-if="$myStore.worker !== undefined">
        <router-link to="/sell">Prodej</router-link> |
      </template>
 -->
      <template v-if="$myStore.user === undefined && $myStore.worker === undefined">
        <!--<router-link to="/login">Přihlasit se</router-link>-->
        <a href="#" @click="loginVisible = true">Přihlásit se</a>
      </template>
      <template v-else>
        <a href="#" @click="logout()">Odhlásit se</a>
      </template>

      <Dialog v-if="loginVisible" @close="loginVisible = false">
        <h1>Přihlášení:</h1>
        <Login @success="loginVisible = false;" />
        <h1>Registrace:</h1>
        <Register />
        <h5><a href="#" v-b-toggle="'worker_login'">
          Vstup pro zaměstance
        </a></h5>
        <b-collapse id="worker_login">
          <h2>Přihlášení zaměstance:</h2>
          <WorkerLogin @success="loginVisible = false; forceUpdate ()" />
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
      loginVisible: false,
      timer: ''
    }
  },
  created: function () {
    this.checkLogin()
    this.timer = setInterval(this.checkLogin, 60000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    forceUpdate () {
      console.log(this.$router)
      console.log(this.$route)
      this.$forceUpdate()
    },
    checkLogin () {
      this.$myStore.load()
      if (this.$myStore.user) {
        console.log('=====U:', this.$myStore.user)
        this.$myStore.backend.Clients.getLogged()
          .then(res => {
            console.log('RELOAD_PAGE Get client data:', res)
            this.$myStore.user = res
            this.$myStore.save()
            // this.$myStore.load()
            this.$forceUpdate()
          })
          .catch(e => {
            console.log('RELOAD_PAGE clent not logged:', e)
            this.$myStore.user = undefined
            this.$myStore.worker = undefined
            this.$myStore.save()
            // this.$router.go()
          })
      } // if user
      else {
        this.$myStore.backend.Workers.getLogged()
          .then(res => {
            console.log('RELOAD_PAGE Get worker data:', res)
            this.$myStore.worker = res
            this.$myStore.save()
            // this.$myStore.load()
            this.$forceUpdate()
          })
          .catch(e => {
            console.log('RELOAD_PAGE worker not logged:', e)
            this.$myStore.user = undefined
            this.$myStore.worker = undefined
            this.$myStore.save()
            // this.$router.go()
          })
      } // else
    },
    logout: function () {
      this.$myStore.backend.Clients.logout()
        .then(res => {
          console.log('OK Logout Client')
          this.$myStore.user = undefined
          this.$myStore.worker = undefined
          this.$myStore.save()
          this.$router.push('/')
          this.$router.go()
          this.$forceUpdate()
        })
        .catch(e => {
          console.log('KO Logout Client')
        })
      this.$myStore.backend.Workers.logout()
        .then(res => {
          console.log('OK Logout Worker')
          this.$myStore.user = undefined
          this.$myStore.worker = undefined
          this.$myStore.save()
          this.$router.push('/')
          this.$router.go()
          this.$forceUpdate()
        })
        .catch(e => {
          console.log('KO Logout Worker')
        })
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
