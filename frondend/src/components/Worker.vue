<template>
  <div>
    <b-card>
      <b-alert variant="success" dismissible
        @dismissed="success = false"
        :show="success">
        Podařilo se vytvořit.
      </b-alert>
      <b-alert variant="danger" dismissible
        @dismissed="failed = false"
        :show="failed">
        Nepodařilo se vztvořit.
      </b-alert>

      <b-input-group prepend="Login:">
        <b-form-input v-model="worker.login"
                      type="text"
                      label="login"
                      :state="checkLogin(worker.login)"
                      :disabled="!editable"
                      placeholder="Pracovníkovo přihlašovací jméno.">
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Jméno:">
        <b-form-input v-model="worker.firstname"
                      type="text"
                      label="firstname"
                      :state="checkName(worker.firstname)"
                      :disabled="!editable"
                      placeholder="Pracovníkovo křestní jméno.">
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Příjmení:">
        <b-form-input v-model="worker.lastname"
                      type="text"
                      label="lastname"
                      :state="checkName(worker.lastname)"
                      :disabled="!editable"
                      placeholder="Pracovníkovo příjmení.">
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="SSN:">
        <b-form-input v-model="worker.ssn"
                  type="text"
                  label="ssn"
                  :state="checkSSN(worker.email)"
                  placeholder="Pracovníkovo ssn."
                      :disabled="!editable"
                  >
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Access Level:" :append="access2str(worker.access)">
        <b-form-input v-model="worker.access"
                  type="number"
                  label="access"
                  :state="checkAccessLvl(worker.access)"
                      :disabled="!editable"
                  placeholder="urověň oprávnění (2-prodavač, 3-manager, 4-admin"
                  >
        </b-form-input>
      </b-input-group>
<!--
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
       -->

      <b-button variant="primary"
                v-if="editable"
                @click="emitWorker()">
        OK
      </b-button>

    </b-card>

  </div>
</template>

<script>
// import axios from 'axios'
// import store from '@/utils/Store.js'
import DateTime from '@/utils/DateTime.js'

export default {
  name: 'Worker',
  props: {
    worker: {
      type: [Object, Function],
      default: () => ({
        firstname: '',
        lastname: '',
        login: '',
        ssn: ''
      })
    },
    editable: {
      default: false
    }
    /* worker:
        id
        firstname
        lastname
        access
        login
        ssn
        deleted
     */
  },
  data: function () {
    return {
      password: '',
      password2: '',
      DateTime: DateTime,
      success: false,
      failed: false
    }
  },
  computed: {
  },
  methods: {

    checkName (name) {
      if (!this.editable) { return null }
      return !!name
    },
    checkLogin (login) {
      // TODO test s backendem
      if (!this.editable) { return null }
      return !!login
    },
    checkNewPassword (password1) {
      return !!password1
    },
    checkRepeatNewPassword (password1, password2) {
      return !!password1 && (password1 === password2)
    },
    checkBirthday (date) {
      if (!this.editable) { return null }
      // TODO
      return true
    },
    checkSSN (ssn) {
      if (!this.editable) { return null }
      return true
    },
    checkAccessLvl (access) {
      if (!this.editable) { return null }
      // TODO
      return access > 1 && access <= 4
    },
    access2str (access) {
      if (access == 2)
        return "prodavač"
      if (access == 3)
        return "Manager"
      if (access == 4)
        return "Admin"
      return "{ Takové neexistuji. }"
    },
    emitWorker () {
      if (this.checkLogin(this.worker.login) &&
        this.checkName(this.worker.firstname) &&
        this.checkName(this.worker.lastname) &&
        this.checkSSN(this.worker.ssn) &&
        this.checkAccessLvl(this.worker.access)
        ) {
        console.log('Worker-emitWorker: ', this.worker )
        this.$emit('changeWorker', { ...(this.worker) })

        this.$emit('exit')
      }
    }

/*
    registerClient: function () {
      console.log('Register client.')
      if (this.checkName(this.client.firstname) &&
        this.checkName(this.client.lastname) &&
        this.checkLogin(this.client.login) &&
        this.checkNewPassword(this.password) &&
        this.checkRepeatNewPassword(this.password, this.password2)
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

    }*/
  },
  mounted: function () {
  }
}
</script>

<style scoped lang="less">

</style>
