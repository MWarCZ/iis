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

    </b-card>

  </div>
</template>

<script>
import axios from 'axios'
import store from '@/utils/Store.js'

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
      store: store
    }
  },
  computed: {
  },
  methods: {
    downloadClient: function () {
      let query = `{
        client(id: ${this.idClient}) {
          id
          firstname
          lastname
          login
        }
      }`
      console.log('Query: ', query)
      axios.post('http://dev.mwarcz.cz', {
        query: query
      })
        .then(res => {
          this.user = res.data.data.client
          console.log('Client is:', this.user)
        })
        .catch(e => {
          console.log('Client problem.')
          console.log(e)
        })
    }
  },
  mounted: function () {
    this.downloadClient()
  }
/*
  // <h1>{{ msg }}</h1>
  props: {
    msg: String
  },
  */
}
</script>

<style scoped lang="less">

</style>
