<template>
  <div>
    <b-card>
      <b-alert variant="danger" dismissible
        @dismissed="loginFailed = false"
        :show="loginFailed">
        Nepodařilo se přihlasit.
      </b-alert>

      <b-input-group prepend="Login:">
        <b-form-input v-model="login"
                      type="text"
                      label="login"
                      placeholder="Váše přihlašovací jméno.">
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Heslo:">
        <b-form-input v-model="password"
                      type="password"
                      label="heslo"
                      placeholder="Váše přihlašovací heslo.">
        </b-form-input>
      </b-input-group>

      <b-button variant="primary" @click="loginClient()">
        Přihlásit se
      </b-button>
    </b-card>

  </div>
</template>

<script>
// import axios from 'axios'
// import store from '@/utils/Store.js'

export default {
  name: 'Login',
  props: {
  },
  data: function () {
    return {
      user: undefined,
      login: '',
      password: '',
      loginFailed: false
    }
  },
  computed: {
  },
  methods: {
    loginClient: function () {
      this.$myStore.backend.Clients.auth(this.login, this.password)
        .then(res => {
          console.log('login res', res)
          if (res) {
            this.$myStore.backend.Clients.getLogged()
              .then(res2 => {
                console.log('login res2', res2)
                this.user = res2
                this.$myStore.user = this.user
                this.$myStore.save()
                this.$emit('success')
              })
              .catch(e => {
                console.log('Client problem.')
                console.log(e)
                this.loginFailed = true
                this.$emit('failed')
              })
          }
          /*

          this.user = res
          this.loginFailed = !res

          console.log('Client is:', this.user)
          if (!this.loginFailed) {
            this.$myStore.user = this.user
            this.$myStore.save()
            this.$emit('success')
          } else {
            this.$emit('failed')
          }
          */
        })
        .catch(e => {
          console.log('Client problem.')
          console.log(e)
          this.loginFailed = true
          this.$emit('failed')
        })
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped lang="less">

</style>
