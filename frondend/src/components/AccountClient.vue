<template>
  <div>
    <b-card v-if="!!user">
      <b-input-group prepend="Jméno:">
        <b-form-input v-model="user.firstname"
                      type="text"
                      label="firstname"
                      :readonly="true"
                      >
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Příjmení:">
        <b-form-input v-model="user.lastname"
                      type="text"
                      label="lastname"
                      :readonly="true"
                      >
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Login:">
        <b-form-input v-model="user.login"
                      type="text"
                      label="login"
                      :readonly="true"
                      >
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Email:">
        <b-form-input v-model="user.email"
                  type="email"
                  label="email"
                  :readonly="true"
                  >
        </b-form-input>
      </b-input-group>

      <br />

      <b-button-group>
        <b-button v-b-toggle="'account_update'">
          Upravit profil
        </b-button>
        <b-button v-b-toggle="'password_update'">
          Změnit helso
        </b-button>
      </b-button-group>

      <b-collapse id="account_update" :visible="false">
        <b-card title="Upravit účet">

          <b-alert variant="success" dismissible
            @dismissed="changeSuccess = false"
            :show="changeSuccess">
            Údaje změněny.
          </b-alert>
          <b-alert variant="danger" dismissible
            @dismissed="changeFailed = false"
            :show="changeFailed">
            Nepodařilo se provést změnit.
          </b-alert>

          <b-input-group prepend="Jméno:">
            <b-form-input v-model="newUser.firstname"
                      type="text"
                      label="firstname"
                      >
            </b-form-input>
          </b-input-group>

          <b-input-group prepend="Příjmení:">
            <b-form-input v-model="newUser.lastname"
                      type="text"
                      label="lastname"
                      >
            </b-form-input>
          </b-input-group>

         <b-input-group prepend="Login:">
            <b-form-input v-model="newUser.login"
                      type="text"
                      label="login"
                      >
            </b-form-input>
          </b-input-group>

         <b-input-group prepend="Email:">
            <b-form-input v-model="newUser.email"
                      type="email"
                      label="email"
                      >
            </b-form-input>
          </b-input-group>

         <b-input-group prepend="Heslo pro ovření:">
            <b-form-input v-model="oldPassword"
                      type="password"
                      label="oldPassword"
                      :state="checkPassword(oldPassword)"
                      >
            </b-form-input>
          </b-input-group>

          <b-button variant="primary"
            @click="updateAccount()">
            Ulozit
          </b-button>

        </b-card>
      </b-collapse>

      <b-collapse id="password_update" :visible="false">

        <b-card title="Změnit heslo">

          <b-alert variant="success" dismissible
            @dismissed="changePassSuccess = false"
            :show="changePassSuccess">
            Heslo změněno.
          </b-alert>
          <b-alert variant="danger" dismissible
            @dismissed="changePassFailed = false"
            :show="changePassFailed">
            Nepodařilo se změnit heslo.
          </b-alert>

         <b-input-group prepend="Nové heslo:">
            <b-form-input v-model="newPassword"
                      type="password"
                      label="newPassword"
                      :state="checkNewPassword()"
                      >
            </b-form-input>
          </b-input-group>

         <b-input-group prepend="Znovu heslo:">
            <b-form-input v-model="newPassword2"
              type="password"
              label="newPassword2"
              :state="checkRepeatNewPassword()"
              >
            </b-form-input>
          </b-input-group>

         <b-input-group prepend="Staré heslo:">
            <b-form-input v-model="oldPassword"
                      type="password"
                      label="oldPassword"
                      >
            </b-form-input>
          </b-input-group>

          <b-button variant="primary"
            @click="updatePassword()">
            Ulozit
          </b-button>

        </b-card>
      </b-collapse>

    </b-card>

  </div>
</template>

<script>
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'AccountClient',
  components: {
    Dialog
  },
  props: {
    idClient: {
      type: Number,
      default: undefined
    }
  },
  data: function () {
    return {
      user: undefined,
      newUser: {},
      newPassword: '',
      newPassword2: '',
      oldPassword: '',
      changeFailed: false,
      changeSuccess: false,
      changePassFailed: false,
      changePassSuccess: false
    }
  },
  computed: {
  },
  methods: {
    checkNewPassword () {
      return !!this.newPassword
    },
    checkPassword (password) {
      return !!password
    },
    checkRepeatNewPassword () {
      return !!this.newPassword && (this.newPassword === this.newPassword2)
    },
    updateAccount () {
      let user = {
        ...this.newUser
      }
      console.log('======================')
      console.log('OLD USER:', this.user)
      console.log('NEW USER:', this.newUser)
      console.log('USER:', user)

      if (user) {
        // id, firstname, lastname, login, password, email, birthday
        this.$myStore.backend.Clients.update(this.newUser.id, this.newUser.login, this.oldPassword, this.newUser.email)
          .then(res => {
            console.log('OK')
            this.user = user

            this.$emit('success', { user: user })
          })
          .catch(e => {
            console.log('KO')
            this.failed = true
            this.$emit('fail')
          })
      } else {
        this.failed = true
        this.$emit('fail')
      }
    },
    updatePassword () {
      console.log('OLD PASSWORD:', this.oldPassword)
      console.log('NEW PASSWORD:', this.newPassword)

      if (this.checkNewPassword() && this.checkRepeatNewPassword()) {
        // id, login, newPassword, newPassword2, oldPassword
        this.$myStore.backend.Clients.updatePassword(this.user.id, this.user.login, this.newPassword, this.newPassword2, this.oldPassword)
          .then(res => {
            console.log('OK', res)
            this.changePassSuccess = true
            this.changePassFailed = false
            this.$emit('success', { password: this.newPassword })
          })
          .catch(e => {
            console.log('KO')
            this.failed = true
            this.changePassFailed = true
            this.changePassSuccess = false
            this.$emit('fail')
          })
      } else {
        this.failed = true
        this.changePassFailed = true
        this.changePassSuccess = false
        this.$emit('fail')
      }
    }
  },
  mounted: function () {
    // Ziskani klienta
    this.$myStore.backend.Clients.getLogged()
    // this.$myStore.backend.Clients.getById(this.idClient)
      .then(res => {
        console.log('Client is:', res)
        if (res.id === undefined) {
          throw new Error({ msg: 'Empty Client.', res })
        }
        this.user = res
        this.newUser = { ...res }
      })
      .catch(e => {
        console.log('ERR:', e)
        this.user = undefined
      })
  }
}
</script>

<style scoped lang="less">

</style>
