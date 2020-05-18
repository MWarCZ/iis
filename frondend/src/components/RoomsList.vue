<template>
  <b-table striped hover
    :fields="fields"
    :items="providerRooms(rooms)"
    sort-by="date">
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
  name: 'RoomsList',
  props: {
    rooms: {
      type: Array,
      default: () => []
    }
  },
  data: function () {
    return {
      fields: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Název', sortable: true },
        { key: 'capacity', label: 'Kapacita', sortable: true },
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
    providerRooms (rooms) {
      let newRooms = rooms
      console.log('RoomList-providerRooms:', newRooms)
      return rooms
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
