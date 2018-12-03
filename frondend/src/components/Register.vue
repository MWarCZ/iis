<template>
  <div>
    <b-card>
      <b-alert variant="success" dismissible
        @dismissed="registerSuccess = false"
        :show="registerSuccess">
        Podařilo se zaregistrovat.
      </b-alert>
      <b-alert variant="danger" dismissible
        @dismissed="registerFailed = false"
        :show="registerFailed">
        Nepodařilo se zaregistrovat.
      </b-alert>

      <b-input-group prepend="Jméno:">
        <b-form-input v-model="client.firstname"
                      type="text"
                      label="firstname"
                      :state="checkName(client.firstname)"
                      placeholder="Váše křestní jméno.">
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Příjmení:">
        <b-form-input v-model="client.lastname"
                      type="text"
                      label="lastname"
                      :state="checkName(client.lastname)"
                      placeholder="Váše příjmení.">
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Login:">
        <b-form-input v-model="client.login"
                      type="text"
                      label="login"
                      :state="checkLogin(client.login)"
                      placeholder="Váše přihlašovací jméno.">
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Email:">
        <b-form-input v-model="client.email"
                  type="email"
                  label="email"
                  :state="checkEmail(client.email)"
                  placeholder="Váše emailová adresa."
                  >
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Heslo:">
        <b-form-input v-model="password"
                      type="password"
                      label="heslo"
                      :state="checkNewPassword(password)"
                      placeholder="Váše přihlašovací heslo.">
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Heslo znovu:">
        <b-form-input v-model="password2"
                      type="password"
                      label="heslo"
                      :state="checkRepeatNewPassword(password, password2)"
                      placeholder="Váše přihlašovací heslo znovu.">
        </b-form-input>
      </b-input-group>

      <b-button variant="primary" @click="registerClient()">
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
      registerSuccess: false,
      DateTime: DateTime
    }
  },
  computed: {
  },
  methods: {
    checkName (name) {
      return !!name
    },
    checkLogin (login) {
      // TODO test s backendem
      return !!login
    },
    checkNewPassword (password1) {
      return !!password1
    },
    checkRepeatNewPassword (password1, password2) {
      return !!password1 && (password1 === password2)
    },
    checkBirthday (date) {
      // TODO
      return true
    },
    checkEmail (email) {
      // TODO
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },

    registerClient: function () {
      console.log('Register client.')
      if (this.checkName(this.client.firstname) &&
        this.checkName(this.client.lastname) &&
        this.checkLogin(this.client.login) &&
        this.checkNewPassword(this.password) &&
        this.checkRepeatNewPassword(this.password, this.password2) &&
        this.checkEmail(this.client.email)
      ) {
        this.client.password = this.password
        // TODO
        // firstname, lastname, login, password, password2, email , birthday
        this.$myStore.backend.Clients.create(
          this.client.firstname,
          this.client.lastname,
          this.client.login,
          this.password,
          this.password2,
          this.client.email
        )
          .then(res => {
            console.log('OK')
            console.log('RES:', res)
            this.registerSuccess = true
            this.$emit('success', { client: this.client })
          })
          .catch(e => {
            console.log('KO')
            this.registerFailed = true
            this.$emit('fail')
          })
      } else {
        this.registerFailed = true
        this.$emit('fail')
      }
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
