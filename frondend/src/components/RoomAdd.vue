<template>
  <div>

    <b-card title="Přidat místnost">

      <b-alert variant="danger" dismissible
        @dismissed="failed = false"
        :show="failed">
        Nepodařilo se.
      </b-alert>

      <b-input-group prepend="Název:">
        <b-form-input v-model="newRoom.name"
                  type="text"
                  label="name"
                  :state="checkName(newRoom.name)"
                  >
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Kapacita:">
        <b-form-input v-model="newRoom.capacity"
                  type="number"
                  label="capacity"
                  :state="checkCapacity(newRoom.capacity)"
                  >
        </b-form-input>
      </b-input-group>

      <b-button variant="primary"
        @click="addRoom()">
        Přidat
      </b-button>

    </b-card>

  </div>
</template>

<script>
export default {
  name: 'RoomAdd',
  props: {
    idCinema: {
      type: Number,
      default: undefined,
      required: true
    }
  },
  data: function () {
    return {
      newRoom: {
        idCinema: this.idCinema
      },
      failed: false
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
    addRoom () {
      console.log('Add room.')
      if (this.checkName(this.newRoom.name) &&
        this.checkCapacity(this.newRoom.capacity)
      ) {
        this.$myStore.backend.Rooms.create(this.newRoom.name, this.newRoom.capacity, this.newRoom.idCinema)
          .then(res => {
            this.newRoom.id = res.data
            console.log('OK')
            this.$emit('success', { room: this.newRoom })
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
