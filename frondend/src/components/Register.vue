<template>
  <div>
    <b-card>
      <b-alert variant="danger" dismissible :show="registerFailed">
        Nepodařilo se zaregistrovat.
      </b-alert>

      <b-input-group prepend="Jméno:">
        <b-form-input v-model="client.firstname"
                      type="text"
                      label="firstname"
                      placeholder="Váše křestní jméno.">
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Příjmení:">
        <b-form-input v-model="client.lastname"
                      type="text"
                      label="lastname"
                      placeholder="Váše příjmení.">
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Login:">
        <b-form-input v-model="client.login"
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

      <b-input-group prepend="Heslo znovu:">
        <b-form-input v-model="password2"
                      type="password2"
                      label="heslo"
                      placeholder="Váše přihlašovací heslo znovu.">
        </b-form-input>
      </b-input-group>

      <b-button variant="primary" @click="loginClient()">
        Zaregistrovat se
      </b-button>
    </b-card>

  </div>
</template>

<script>
// import axios from 'axios'
// import store from '@/utils/Store.js'
import DateTime from '@/utils/DateTime.js'

export default {
  name: 'Register',
  props: {
  },
  data: function () {
    return {
      user: undefined,
      client: {
        firstname: '',
        lastname: '',
        login: ''
      },
      password: '',
      password2: '',
      registerFailed: false,
      DateTime: DateTime
    }
  },
  computed: {
  },
  methods: {
    loginClient: function () {
      /*
      this.$myStore.backend.Clients.auth(this.login, this.password)
        .then(res => {
          this.user = res
          this.loginFailed = !res

          console.log('Client is:', this.user)
          if (!this.loginFailed) {
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
        */
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped lang="less">

</style>
