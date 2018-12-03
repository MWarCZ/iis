<template>
  <div>
    <button @click="$router.go(-1)">Zpět</button>
    <button @click="echoAll()">xxx</button>
    <!-- <Cinema :id="idCinema"/> -->
    <Cinema :cinema="cinema"
            :rooms="rooms"
            :projections="projections"
            :films="films"
            :discounts="discounts"
            @deleteRoom="deleteRoom(arguments[0])"
            @updateCinema="updateCinema(arguments[0])"
            @addRoom="addRoom(arguments[0])"
            @addProjection="(addProjection(arguments[0]))"
            @deleteProjection="(deleteProjection(arguments[0]))"
            @addReservation="(addReservation(arguments[0]))"
            @addAndSellReservation="(addAndSellReservation(arguments[0]))"
            />
    <Dialog v-if="newIdReservation >= 0"
      @close="newIdReservation = -1"
      >
      <b-alert variant="success" show>
        <h2 class="alert-heading">ID vaší rezervace je: {{newIdReservation}}</h2>
        <br />
        <h4 class="alert-heading">Prosim uschovejte si ho.</h4>
        <br />
        <b-button variant="success"
                  @click="newIdReservation = -1"
                  >
        OK</b-button>
      </b-alert>

    </Dialog>
  </div>
</template>

<script>
import Cinema from '@/components/Cinema.vue'
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'CinemaPage',
  components: {
    Cinema,
    Dialog
  },
  data: function () {
    return {
      idCinema: parseInt(this.$route.params.id),
      cinema: () => {},
      rooms: () => [],
      projections: () => [],
      films: () => [],
      discounts: () => [],
      newIdReservation: -1
    }
  },
  created () {
    // this.cinema = this.getCinema(this.idCinema)
    // this.rooms = this.getRooms(this.idCinema)
    // this.projections = this.getProjections(this.idCinema)
    // this.films = this.getFilms()
    // this.discounts = this.getDiscounts()

    this.getCinema(this.idCinema)
    // this.getRooms(this.idCinema)
    this.getProjections(this.idCinema)
    this.getFilms()
    this.getDiscounts()
  },
  methods: {
    xxx (values) {
      // let obj = {...values}[0] // obj = {idRoom: 1}
      console.log('====XXX===>:', values)
    },
    echoAll () {
      console.log('================')
      console.log('idCinema', this.idCinema)
      console.log('cinema', this.cinema, typeof (this.cinema))
      console.log('rooms', this.rooms, typeof (this.rooms))
      console.log('projections', this.projections, typeof (this.projections))
      console.log('films', this.films, typeof (this.films))
      console.log('discounts', this.discounts, typeof (this.discounts))
      console.log('================')
    },

    deleteRoom (args) {
      this.xxx(args)
      // {idRoom: 1}

      this.$myStore.backend.Rooms.remove(args.idRoom)
        .then(res => {
          if (!res.data) {
            console.log('ERR:', res.error)
          } else {
            console.log('OK:', res.data)
            this.rooms = this.rooms.filter(r => r.id !== args.idRoom)
          }
        })
        .catch(e => {
          console.log('ERR:', e)
        })
    },
    updateCinema (args) {
      this.xxx(args)
      // id: 1, name: "Kino Dukla", address: "J. Masaryka 1421/20, Jihlava"}

      // id, name, address
      this.$myStore.backend.Cinemas.update(args.id, args.name, args.address)
        .then(res => {
          if (!res.data) {
            console.log('ERR:', res.error)
          } else {
            console.log('OK:', res.data)
            this.cinema.name = args.name
            this.cinema.address = args.address
          }
        })
        .catch(e => {
          console.log('ERR:', e)
        })
    },
    addRoom (args) {
      this.xxx(args)
      // {idCinema: 1, name: "aaaaaa", capacity: "111111"}

      // name, capacity, idCinema
      this.$myStore.backend.Rooms.create(args.name, args.capacity, args.idCinema)
        .then(res => {
          if (!res.data) {
            console.log('ERR:', res.error)
          } else {
            console.log('OK:', res.data)
            this.rooms.push({ ...args, id: Number(res.data) })
          }
        })
        .catch(e => {
          console.log('ERR:', e)
        })
    },
    addProjection (args) {
      this.xxx(args)
      // {datetime: "Mon, 03 Dec 2018 19:18:00 GMT", price: 100, idFilm: 1, idRoom: 1, idAccess: undefined}

      // datetime, price, idFilm, idRoom, idAccess = 1
      this.$myStore.backend.Projections.create(args.datetime, args.price, args.idFilm, args.idRoom)
        .then(res => {
          if (!res.data) {
            console.log('ERR:', res.error)
          } else {
            console.log('OK:', res.data)
            this.projections.push({ ...args, id: Number(res.data) })
          }
        })
        .catch(e => {
          console.log('ERR:', e)
        })
    },
    deleteProjection (args) {
      this.xxx(args)
      // {idProjection: 1}

      this.$myStore.backend.Projections.remove(args.idProjection)
        .then(res => {
          if (!res.data) {
            console.log('ERR:', res.error)
          } else {
            console.log('OK:', res.data)
            this.projections = this.projections.filter(r => r.id !== args.idProjection)
          }
        })
        .catch(e => {
          console.log('ERR:', e)
        })
    },
    addReservation (args) {
      this.xxx(args)
      // {idUser: 1, tickes: Array(1)}
      // tickets: [{seatNumber: 25, idProjection: 1, idDiscount: 1}]

      // tickets, idClient
      this.$myStore.backend.Reservations.create(args.tickets, args.idUser)
        .then(res => {
          if (!res.data) {
            console.log('ERR:', res.error)
          } else {
            console.log('OK:', res.data)
            this.newIdReservation = res.data
          }
        })
        .catch(e => {
          console.log('ERR:', e)
        })
    },
    addAndSellReservation (args) {
      this.xxx(args)
      // {idUser: null, tickes: Array(1)}
      // tickets: [{seatNumber: 25, idProjection: 1, idDiscount: 1}]

      // tickets, idClient
      this.$myStore.backend.Reservations.create(args.tickets, args.idUser)
        .then(res => {
          if (!res.data) {
            console.log('ERR:', res.error)
          } else {
            console.log('OK:', res.data)
            this.$myStore.backend.Reservations.payAndPick(res.data)
              .then(res2 => {
                console.log('OK2:', res2.data)
                this.newIdReservation = res.data
              })
              .catch(e => {
                console.log('KO2:', e)
              })
          }
        })
        .catch(e => {
          console.log('ERR:', e)
        })
    },

    getCinema (idCinema) {
      this.$myStore.backend.Cinemas.getById(idCinema)
        .then(res => {
          console.log('Cinema is:', res)
          return this.$myStore.backend.Rooms.getByIdCinema(idCinema)
            .then(res2 => {
              res.rooms = res2
              console.log('Rooms are:', res2)
              return res
            })
            .catch(e => {
              return undefined
            })
        })
        .then(res => {
          console.log('Cinema with Rooms is:', res)
          if (res.id === undefined) {
            throw new Error({ msg: 'Empty Cinema.', res })
          }
          this.cinema = res
          this.rooms = res.rooms
        })
        .catch(e => {
          console.log('ERR:', e)
          this.cinema = undefined
        })
    },

    getFilms () {
      // Stazeni filmu
      this.$myStore.backend.Films.getAll()
        .then(res => {
          console.log('Films are:', res)
          if (res[0] === undefined) {
            throw new Error({ msg: 'Empty Films.', res })
          }
          this.films = res
        })
        .catch(e => {
          console.log('ERR:', e)
          this.films = []
        })
    },

    getDiscounts () {
      // Stazeni projektci
      this.$myStore.backend.Discounts.getAll()
        .then(res => {
          console.log('Discounts are:', res)
          if (res[0] === undefined) {
            throw new Error({ msg: 'Empty Discounts.', res })
          }
          this.discounts = res
        })
        .catch(e => {
          console.log('ERR:', e)
          this.discounts = []
        })
    },

    getProjections () {
      // Stazeni projektci
      this.$myStore.backend.Projections.getAll()
        .then(res => {
          console.log('Projections are:', res)
          if (res[0] === undefined) {
            throw new Error({ msg: 'Empty Projections.', res })
          }
          this.projections = res
        })
        .catch(e => {
          console.log('ERR:', e)
          this.projections = []
        })
    }
    /*
    getCinema (idCinema) {
      let cinema = {
        id: 1,
        name: 'KinoABC',
        address: 'Adresa kina abc'
      }
      return cinema
    },
    */
    /*
    getRooms (idCinema) {
      let rooms = [
        {
          id: 1,
          name: 'A1',
          capacity: 20,
          idCinema: idCinema
        },
        {
          id: 2,
          name: 'A2',
          capacity: 30,
          idCinema: idCinema
        },
        {
          id: 3,
          name: 'A3',
          capacity: 40,
          idCinema: idCinema
        }
      ]
      return rooms
    },
    */
    /*
    getProjections (idCinema) {
      let projections = [
        {
          id: 1,
          datetime: '2019-01-01 20:00',
          price: 100,
          idFilm: 1,
          idRoom: 1,
          idAccess: 1
        },
        {
          id: 2,
          datetime: '2019-01-02 10:00',
          price: 150,
          idFilm: 1,
          idRoom: 2,
          idAccess: 1
        },
        {
          id: 3,
          datetime: '2019-01-01 15:00',
          price: 90,
          idFilm: 2,
          idRoom: 1,
          idAccess: 1
        }
      ]
      return projections
    },
    */
    /*
    getFilms () {
      let films = [
        {
          id: 1,
          released: '2017-01-01 20:00',
          name: 'Film ABC',
          duration: 60
        },
        {
          id: 2,
          released: '2018-01-01 20:00',
          name: 'Film XYZ',
          duration: 60
        }
      ]
      return films
    },
    */
    /*
    getDiscounts () {
      let discounts = [
        {
          id: 1,
          description: 'Sleva 1',
          discount: 0
        },
        {
          id: 2,
          description: 'Sleva 2',
          discount: 50
        },
        {
          id: 3,
          description: 'Sleva 3',
          discount: 90
        }
      ]
      return discounts
    } */
  }
}
</script>
