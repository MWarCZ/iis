<template>
  <div>

    <b-card title="Přidat herce">

      <b-alert variant="danger" dismissible
        @dismissed="failed = false"
        :show="failed">
        Nepodařilo se.
      </b-alert>

      <b-input-group prepend="Herec:">
        <b-form-select v-model="newActor.id"
                       :state="checkActor(newActor.id)"
                       >
          <option :value="undefined" selected> ( Vyber herce )</option>
          <template v-for="(actor, index) in filterActors ()">
            <option :value="actor.id" :key="index">
              {{actor.firstname + ' ' + actor.lastname}}
            </option>
          </template>
        </b-form-select>
      </b-input-group>

      <b-button variant="primary"
        @click="addActor()">
        Přidat
      </b-button>

    </b-card>

  </div>
</template>

<script>
export default {
  name: 'RoomAdd',
  props: {
    idFilm: {
      type: Number,
      default: undefined,
      required: true
    },
    disabledActors: {
      type: Array,
      default: () => []
    }
  },
  data: function () {
    return {
      newActor: {
        idFilm: this.idFilm
      },
      actors: [],
      failed: false
    }
  },
  computed: {
  },
  methods: {
    checkActor (idActor) {
      return typeof (idActor) === 'number'
    },
    addActor () {
      console.log('Add actor.')
      if (this.checkActor(this.newActor.id)
      ) {
        // TODO
        Promise.resolve(0)
          .then(res => {
            console.log('OK')
            this.newActor = this.actors.find(actor => actor.id === this.newActor.id)

            this.$emit('success', { actor: this.newActor })
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
    filterActors () {
      let actors = this.actors.filter(actor => {
        let exist = this.disabledActors.find(da => {
          return da.id === actor.id
        })
        return !exist
      })
      return actors
    }
  },
  mounted: function () {
    // Ziskani seznamu hercu
    this.$myStore.backend.Actors.getAll()
      .then(res => {
        console.log('Actors are:', res)
        if (res[0] === undefined) {
          throw new Error({ msg: 'Empty Actors', res })
        }
        this.actors = res
      })
      .catch(e => {
        console.log('ERR:', e)
      })
  }
}
</script>

<style scoped lang="less">

</style>
