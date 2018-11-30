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

          <b-button variant="primary"
            @click="updateAccount()">
            Ulozit
          </b-button>

        </b-card>
      </b-collapse>

      <b-collapse id="password_update" :visible="false">
        <b-card title="Změnit heslo">

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
export default {
  name: 'AccountClient',
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
      oldPassword: ''
    }
  },
  computed: {
  },
  methods: {
    checkNewPassword () {
      return !!this.newPassword
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
        // TODO
        Promise.resolve(0)
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
        // TODO
        Promise.resolve(0)
          .then(res => {
            console.log('OK')

            this.$emit('success', { password: this.newPassword })
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
    }
  },
  mounted: function () {
    // Ziskani klienta
    this.$myStore.backend.Clients.getById(this.idClient)
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
