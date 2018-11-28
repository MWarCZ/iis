<template>
  <div>

    <b-card title="Přidat kino">

      <b-alert variant="danger" dismissible
        @dismissed="failed = false"
        :show="failed">
        Nepodařilo se.
      </b-alert>

      <b-input-group prepend="Název:">
        <b-form-input v-model="newCinema.name"
                  type="text"
                  label="name"
                  :state="checkName(newCinema.name)"
                  >
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Adresa:">
        <b-form-input v-model="newCinema.address"
                  type="text"
                  label="address"
                  :state="checkAddress(newCinema.address)"
                  >
        </b-form-input>
      </b-input-group>

     <b-input-group prepend="Obrázek:">
        <b-form-input v-model="newCinema.img"
                  type="url"
                  label="img"
                  :state="checkUrl(newCinema.img)"
                  >
        </b-form-input>
      </b-input-group>

      <b-button variant="primary"
        @click="addCinema()">
        Přidat
      </b-button>

    </b-card>

  </div>
</template>

<script>
export default {
  name: 'CinemaAdd',
  props: {
  },
  data: function () {
    return {
      newCinema: {},
      failed: false
    }
  },
  computed: {
  },
  methods: {
    checkName (name) {
      return !!name
    },
    checkAddress (address) {
      return !!address
    },
    checkUrl (someUrl) {
      if (!someUrl) {
        return null
      }
      try {
        // eslint-disable-next-line
        let tmp = new URL(someUrl)
        return true
      } catch (e) {
        return false
      }
    },
    addCinema () {
      console.log('Add cinema.')
      if (this.checkName(this.newCinema.name) &&
        this.checkAddress(this.newCinema.address) &&
        this.checkUrl(this.newCinema.img) !== false
      ) {
        // TODO
        Promise.resolve(0)
          .then(res => {
            console.log('OK')
            this.newCinema.id = Math.floor(Math.random() * Math.floor(1000))
            this.$emit('success', { cinema: this.newCinema })
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

  }
}
</script>

<style scoped lang="less">

</style>
