<template>
  <div>

    <b-card title="Upravit kino">

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
    cinema: {
      type: Object,
      default: () => {}
    }
  },
  data: function () {
    return {
      oldCinema: this.cinema,
      newCinema: { ...this.cinema },
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
      }
    }
  },
  mounted: function () {
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
    }
  }
}
</script>

<style scoped lang="less">

</style>
