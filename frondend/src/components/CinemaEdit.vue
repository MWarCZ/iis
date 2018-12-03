<template>
  <div>

    <b-card title="Upravit kino">

      <b-alert variant="danger" dismissible
        @dismissed="failed = false"
        :show="failed">
        Chybně vyplněná pole.
      </b-alert>

      <b-input-group prepend="Název:">
        <b-form-input v-model="newName"
                  type="text"
                  label="name"
                  :state="checkName(newName)"
                  >
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Adresa:">
        <b-form-input v-model="newAddress"
                  type="text"
                  label="address"
                  :state="checkAddress(newAddress)"
                  >
        </b-form-input>
      </b-input-group>

     <b-input-group prepend="Obrázek:">
        <b-form-input v-model="newImg"
                  type="url"
                  label="img"
                  :state="checkUrl(newImg)"
                  >
        </b-form-input>
      </b-input-group>

      <b-button variant="primary"
        @click="updateCinema()">
        Uložit
      </b-button>

    </b-card>

  </div>
</template>

<script>
export default {
  name: 'CinemaEdit',
  props: {
    idCinema: {
      type: Number,
      default: undefined
    },
    name: {
      type: String,
      default: undefined
    },
    address: {
      type: String,
      default: undefined
    }
  },
  data: function () {
    return {
      newName: this.name,
      newAddress: this.address,
      newImg: '',
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

    updateCinema () {
      console.log('Update cinema.')

      if (this.checkName(this.newName) &&
        this.checkAddress(this.newAddress) &&
        this.checkUrl(this.newImg) !== false
      ) {
        this.$emit('updateCinema', {
          id: this.idCinema,
          name: this.newName,
          address: this.newAddress
        })
        this.$emit('exit')
      } else {
        this.failed = true
      }
      /*
      if (this.checkName(this.newCinema.name) &&
        this.checkAddress(this.newCinema.address) &&
        this.checkUrl(this.newCinema.img) !== false
      ) {
        // TODO
        this.$myStore.backend.Cinemas.update(this.newCinema.id, this.newCinema.name, this.newCinema.address, this.newCinema.img)
          .then(res => {
            console.log('OK', res)
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
      } */
    }
  },
  mounted: function () {
    /*
    if (this.idCinema !== undefined) {
      // Ziskani kina
      this.$myStore.backend.Cinemas.getById(this.idCinema)
        .then(res => {
          console.log('Cinema is:', res)
          if (res.id === undefined) {
            throw new Error({ msg: 'Empty Cinema.', res })
          }
          this.oldCinema = res
          this.newCinema = { ...res }
        })
        .catch(e => {
          console.log('ERR:', e)
          this.oldCinema = undefined
        })
    } */
  }
}
</script>

<style scoped lang="less">

</style>
