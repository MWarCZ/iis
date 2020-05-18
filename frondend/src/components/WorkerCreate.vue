<template>
  <div>
    <b-card>
      <b-alert variant="success" dismissible
        @dismissed="registerSuccess = false"
        :show="registerSuccess">
        Podařilo se vytvořit.
      </b-alert>
      <b-alert variant="danger" dismissible
        @dismissed="registerFailed = false"
        :show="registerFailed">
        Nepodařilo se vytvořit.
      </b-alert>

      <b-input-group prepend="Jméno:">
        <b-form-input v-model="client.firstname"
                      type="text"
                      label="firstname"
                      :state="checkName(client.firstname)"
                      placeholder="Pracovníkovo křestní jméno.">
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Příjmení:">
        <b-form-input v-model="client.lastname"
                      type="text"
                      label="lastname"
                      :state="checkName(client.lastname)"
                      placeholder="Pracovníkovo příjmení.">
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Login:">
        <b-form-input v-model="client.login"
                      type="text"
                      label="login"
                      :state="checkLogin(client.login)"
                      placeholder="Pracovníkovo přihlašovací jméno.">
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="SSN:">
        <b-form-input v-model="client.ssn"
                  type="text"
                  label="ssn"
                  :state="checkSSN(client.ssn)"
                  placeholder="Pracovnikovo ssn. pr. 123456/1234"
                  >
        </b-form-input>
      </b-input-group>
<!--
      <b-input-group prepend="Access Level:">
        <b-form-select v-model="client.access"
                  :state="checkAccessLvl(client.access)"
                       >
          <option :value="2"> Prodavač</option>
          <option :value="3"> Manager</option>
          <option :value="4"> Admin</option>
        </b-form-select>
      </b-input-group>
 -->
      <b-input-group prepend="Heslo:">
        <b-form-input v-model="password"
                      type="password"
                      label="heslo"
                      :state="checkNewPassword(password)"
                      placeholder="Pracovníkovo přihlašovací heslo.">
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Heslo znovu:">
        <b-form-input v-model="password2"
                      type="password"
                      label="heslo"
                      :state="checkRepeatNewPassword(password, password2)"
                      placeholder="Pracovníkovo přihlašovací heslo znovu.">
        </b-form-input>
      </b-input-group>

      <b-button variant="primary" @click="registerWorker()">
        Zaregistrovat Pracovnika
      </b-button>
    </b-card>

  </div>
</template>

<script>
// import axios from 'axios'
// import store from '@/utils/Store.js'
import DateTime from '@/utils/DateTime.js'

export default {
  name: 'WorkerCreate',
  props: {
  },
  data: function () {
    return {
      user: undefined,
      client: {
        firstname: '',
        lastname: '',
        login: '',
        ssn: ''
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
    checkSSN (ssn) {
      var re = /^([0-9]{6})(\/)?([0-9]{3,4})$/
      return re.test(ssn)
    },
    checkAccessLvl (access) {
      // TODO
      return access > 1 && access <= 4
    },

    registerWorker: function () {
      console.log('Register worker.')
      if (this.checkName(this.client.firstname) &&
        this.checkName(this.client.lastname) &&
        this.checkLogin(this.client.login) &&
        this.checkNewPassword(this.password) &&
        this.checkRepeatNewPassword(this.password, this.password2) &&
        this.checkSSN(this.client.ssn)
      ) {
        this.client.password = this.password
        // TODO
        // firstname, lastname, login, password, password2, ssn, idCinema, access
        this.$myStore.backend.Workers.create(
          this.client.firstname,
          this.client.lastname,
          this.client.login,
          this.password,
          this.password2,
          this.client.ssn,
          this.client.idCinema,
          this.client.access
        )
          .then(res => {
            console.log('OK')
            console.log('RES:', res)
            this.registerSuccess = true
            this.$emit('success', { worker: this.client })
          })
          .catch(e => {
            console.log('KO2', e)
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
