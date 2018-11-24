<template>
  <div>
    <b-card>
      <b-alert variant="danger" dismissible :show="loginFailed">
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
import store from '@/utils/Store.js'

export default {
  name: 'Login',
  props: {
  },
  data: function () {
    return {
      user: undefined,
      login: '',
      password: '',
      loginFailed: false,
      store: store
    }
  },
  computed: {
  },
  methods: {
    loginClient: function () {
      this.$myStore.backend.Clients.auth(this.login, this.password)
        .then(res => {
          this.user = res
          this.loginFailed = !res

          console.log('Client is:', this.user)
          if (!this.loginFailed) {
            this.store.user = this.user
            this.store.save()
            this.$emit('success')
          }
          this.$emit('failed')
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
