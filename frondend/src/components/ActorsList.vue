<template>
  <b-table striped hover
    :fields="fields"
    :items="filterActor()"
    sort-by="date">
    <template slot="event" slot-scope="data">
      <b-button v-if="!!$myStore.worker && $myStore.worker.access >= 3"
        variant="outline-danger"
        @click="$emit('deleteActor', { idActor: data.item.id, idFilm: idFilm })">
        Smazat
      </b-button>
      <span v-else>
        Nemas prava odebirat herce.
      </span>
    </template>
  </b-table>
</template>

<script>
export default {
  name: 'ActorsList',
  props: {
    idFilm: {
      type: Number,
      default: undefined
    },
    actors: {
      type: Array,
      default: () => []
    }
  },
  data: function () {
    return {
      nowActors: this.actors,
      fields: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'firstname', label: 'Jméno', sortable: true },
        { key: 'lastname', label: 'Příjmení', sortable: true },
        { key: 'event', label: 'Akce' }
      ]
    }
  },
  computed: {
  },
  methods: {
    checkName (name) {
      return !!name
    },
    checkCapacity (capacity) {
      return capacity >= 0 && capacity !== undefined
    },
    removeActor (idActor) {
      console.log('Remove actor.')
      /*
      if (idActor !== undefined) {
        // TODO
        this.$myStore.backend.Films.delActor(this.idFilm, idActor)
          .then(res => {
            console.log('OK')
            this.nowActors = this.nowActors.filter(actor => {
              return actor.id !== idActor
            })
            this.$emit('success', { actors: this.nowActors })
          })
          .catch(e => {
            console.log('KO')
            this.$emit('fail')
          })
      } */
    },
    filterActor () {
      // if (this.idFilm === undefined) {
      return this.actors
      // } else {
      // let actors = this.nowActors.filter(actor => {
      //   console.log(actor)
      //   return actor.films.indexOf(this.idFilm) >= 0
      // })
      // return actors
      // }
    }
  },
  mounted: function () {
    /*
    if (this.idFilm !== undefined) {
      // Ziskani mistnosti hercu
      this.$myStore.backend.Actors.getAll()
        .then(res => {
          console.log('Actors are:', res)
          if (res[0] === undefined) {
            throw new Error({ msg: 'Empty Actors', res })
          }
          this.nowActors = res
        })
        .catch(e => {
          console.log('ERR:', e)
        })
    } */
  }
}
</script>

<style scoped lang="less">

</style>
