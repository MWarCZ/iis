<template>
  <div>

    <b-card title="Přidat projekci">

      <b-alert variant="danger" dismissible
        @dismissed="failed = false"
        :show="failed">
        Chybně vyplněná pole.
      </b-alert>

      <b-input-group prepend="Datum:">
        <b-form-input v-model="_datetime"
                      type="datetime-local"
                      :state="checkDateTime(projectionDateTime)"
                      >
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Film:">
        <b-form-select v-model="newIdFilm"
                       :state="checkFilm(newIdFilm)"
                       >
          <option :value="undefined" selected> ( Vyber Film )</option>
          <template v-for="(film, index) in films">
            <option :value="film.id" :key="index">
              {{film.name}}
            </option>
          </template>
        </b-form-select>
      </b-input-group>

      <b-input-group prepend="Kino:">
        <b-form-select v-model="newIdCinema"
                       :state="checkCinema(newIdCinema)"
                       @change="newIdRoom = undefined"
                       >
          <option :value="undefined" selected> ( Vyber kino )</option>
          <template v-for="(cinema, index) in cinemas">
            <option :value="cinema.id" :key="index">
              {{cinema.name}}
            </option>
          </template>
        </b-form-select>
      </b-input-group>

      <b-input-group prepend="Místnost:">
        <b-form-select v-model="newIdRoom"
                       :state="checkRoom(newIdRoom)"
                       >
          <option :value="undefined" selected> ( Vyber mistnost )</option>
          <template v-for="(room, index) in filterRooms()">
            <option :value="room.id" :key="index">
              {{room.name}}
            </option>
          </template>
        </b-form-select>
      </b-input-group>

      <b-input-group prepend="Cena:">
        <b-form-input v-model="newPrice"
                  type="number"
                  label="price"
                  :state="checkPrice(newPrice)"
                  >
        </b-form-input>
      </b-input-group>

      <b-button variant="primary"
        @click="addProjection()">
        Přidat
      </b-button>

    </b-card>

  </div>
</template>

<script>
import DateTime from '@/utils/DateTime.js'

export default {
  name: 'ProjectionAdd',
  props: {
    idFilm: {
      type: Number,
      default: undefined
    },
    idCinema: {
      type: Number,
      default: undefined
    },
    cinemas: {
      type: Array,
      default: () => []
    },
    films: {
      type: Array,
      default: () => []
    },
    rooms: {
      type: Array,
      default: () => []
    }
  },
  data: function () {
    return {
      /*
      newProjection: {
        idFilm: this.idFilm,
        idCinema: this.idCinema,
        idRoom: undefined,
        film: 'film',
        cinema: 'cinema',
        room: 'room',
        price: 100,
        datetime: '2019'

      },
      rooms: [],
      */
      newIdFilm: this.idFilm,
      newIdRoom: undefined,
      newIdCinema: this.idCinema,
      newPrice: 100,
      newIdAccess: 1,
      projectionDateTime: new Date(),
      failed: false
    }
  },
  computed: {
    _datetime: {
      get () {
        return DateTime.date2string(this.projectionDateTime, 'input') + 'T' + DateTime.time2string(this.projectionDateTime, 'input')
      },
      set (value) {
        let newDate = new Date(value)
        if (isNaN(newDate.getTime())) {
          newDate = new Date()
        }
        this.projectionDateTime = newDate
      }
    }
  },
  methods: {
    checkFilm (idFilm) {
      return typeof (idFilm) === 'number'
    },
    checkCinema (idCinema) {
      return typeof (idCinema) === 'number'
    },
    checkRoom (idRoom) {
      return typeof (idRoom) === 'number'
    },
    checkName (name) {
      return !!name
    },
    checkPrice (price) {
      return price > 0 && price !== undefined
    },
    checkDateTime (datetime) {
      let res = datetime.getTime() > new Date().getTime()
      return res
    },
    addProjection () {
      console.log('Add projection.')
      if (this.checkPrice(this.newPrice) &&
        this.checkDateTime(this.projectionDateTime) &&
        this.checkFilm(this.newIdFilm) &&
        this.checkCinema(this.newIdCinema) &&
        this.checkRoom(this.newIdRoom)
      ) {
        this.$emit('addProjection', {
          datetime: this.projectionDateTime.toUTCString(),
          price: this.newPrice,
          idFilm: this.newIdFilm,
          idRoom: this.newIdRoom,
          idAccess: this.newAddress
        })
        this.$emit('exit')
      } else {
        this.failed = true
      }
      /*
      // TODO : Pristupnost promitani
      if (this.checkPrice(this.newProjection.price) &&
        this.checkDateTime(this.projectionDateTime) &&
        this.checkFilm(this.newProjection.idFilm) &&
        this.checkCinema(this.newProjection.idCinema) &&
        this.checkRoom(this.newProjection.idRoom)
      ) {
        this.newProjection.datetime = this.projectionDateTime.toUTCString()
        // datetime, price, idFilm, idRoom, idAccess = 1
        this.$myStore.backend.Projections.create(this.newProjection.datetime, this.newProjection.price, this.newProjection.idFilm, this.newProjection.idRoom)
          .then(res => {
            console.log('OK')
            if (res.data) {
              this.newProjection.id = res.data
              // this.newProjection.datetime = this.projectionDateTime.toUTCString()
              this.newProjection.film = this.films.find(film => {
                return film.id === this.newProjection.idFilm
              }).name
              this.newProjection.cinema = this.cinemas.find(cinema => {
                return cinema.id === this.newProjection.idCinema
              }).name
              this.newProjection.room = this.rooms.find(room => {
                return room.id === this.newProjection.idRoom
              }).name
              console.log('OK2')

              this.$emit('success', { projection: this.newProjection })
            } else {
              console.log('KO2')
              this.failed = true
              this.$emit('fail')
            }
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
    },
    filterRooms () {
      let rooms = this.rooms
      rooms = rooms.filter(room => {
        return room.idCinema === this.newIdCinema
      })
      return rooms
    }
  },
  mounted: function () {
    /*
    // Ziskani mistnosti mistnosti
    this.$myStore.backend.Rooms.getAll()
      .then(res => {
        console.log('Rooms are:', res)
        if (res[0] === undefined) {
          throw new Error({ msg: 'Empty Rooms', res })
        }
        this.rooms = res
      })
      .catch(e => {
        console.log('ERR:', e)
      }) */
  }
}
</script>

<style scoped lang="less">

</style>
