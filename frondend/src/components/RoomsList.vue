<template>
  <b-table striped hover
    :fields="fields"
    :items="nowRooms"
    sort-by="date">
    <template slot="event" slot-scope="data">
      <b-button v-if="!!$myStore.worker && $myStore.worker.access >= 3"
        variant="outline-danger"
        @click="removeRoom(data.item.id)">
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
    idCinema: {
      type: Number,
      default: undefined
    },
    rooms: {
      type: Array,
      default: () => []
    }
  },
  data: function () {
    return {
      nowRooms: this.rooms,
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
    removeRoom (idRoom) {
      console.log('Remove room.')
      if (idRoom !== undefined) {
        // TODO
        this.$myStore.backend.Rooms.remove(idRoom)
          .then(res => {
            this.nowRooms = this.nowRooms.filter(room => {
              return room.id !== idRoom
            })
            console.log('OK', res)
            this.$emit('success', { rooms: this.nowRooms })
          })
          .catch(e => {
            console.log('KO')
            this.$emit('fail')
          })
      }
    }
  },
  mounted: function () {
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
    }
  }
}
</script>

<style scoped lang="less">

</style>
