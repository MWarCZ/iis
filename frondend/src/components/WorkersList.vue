<template>
  <b-table striped hover
    :fields="fields"
    :items="providerWorkers(workers)"
    sort-by="date">

    <template slot="show_details" slot-scope="row">
      <b-button @click="row.toggleDetails()">
        {{ !row.detailsShowing ? 'Zobrazit' : 'Skrýt'}}
      </b-button>
    </template>
    <template slot="row-details" slot-scope="row">
      <b-card>
        {{row.item.ssn}}
        <b-button variant="outline-primary">Uložit změny</b-button>
      </b-card>
    </template>

    <template slot="event" slot-scope="data">
      <b-button v-if="!!$myStore.worker && $myStore.worker.access >= 3"
        variant="outline-danger"
        @click="$emit('deleteRoom', { idRoom: data.item.id })">
        Smazat
      </b-button>
      <span v-else>
        Nemas prava mazat místnost.
      </span>
    </template>
  </b-table>
</template>

<script>
export default {
  name: 'WorkersList',
  props: {
    workers: {
      type: [Array, Function],
      default: () => []
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
      fields: [
        { key: 'login', label: 'Login', sortable: true },
        { key: 'firstname', label: 'Jméno', sortable: true },
        { key: 'lastname', label: 'Příjmení', sortable: true },
        { key: 'show_details', label: 'Zobrazit' },
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
    providerWorkers (workers) {
      let workers1 = workers
      console.log('WorkerList-providerWorkers:', workers1)
      return workers1
    }
  },
  mounted: function () {
    /*
    if (this.idCinema !== undefined) {
      // Ziskani mistnosti kina
      this.$myStore.backend.Rooms.getByIdCinema(this.idCinema)
        .then(res => {
          console.log('Rooms are:', res)
          if (res[0] === undefined) {
            throw new Error({ msg: 'Empty Rooms', res })
          }
          this.nowRooms = res
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
