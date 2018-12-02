<template>
  <div>
    <button @click="$router.go(-1)">Zpět</button>
    <button @click="echoAll()">xxx</button>
    <!-- <Film :id="idFilm"/> -->
    <Film   :film="film"
            :rooms="rooms"
            :projections="projections"
            :cinemas="cinemas"
            :discounts="discounts"
            :actors="actors"
            @deleteActor="deleteActor(arguments[0])"
            @updateFilm="xxx(arguments[0])"
            @addActor="addActor(arguments[0])"

            @addProjection="(addProjection(arguments[0]))"
            @deleteProjection="(deleteProjection(arguments[0]))"
            @addReservation="(addReservation(arguments[0]))"
            @addAndSellReservation="(addAndSellReservation(arguments[0]))"
            />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Film from '@/components/Film.vue'

export default {
  name: 'FilmPage',
  components: {
    Film
  },
  data: function () {
    return {
      idFilm: parseInt(this.$route.params.id),
      film: () => {},
      rooms: () => [],
      projections: () => [],
      cinemas: () => [],
      discounts: () => [],
      actors: () => [],

      allActors: () => []
    }
  },
  created () {
    //this.film = this.getFilm(this.idFilm)
    //this.rooms = this.getRooms(this.idCinema)
    //this.projections = this.getProjections(this.idCinema)
    //this.cinemas = this.getCinemas()
    //this.discounts = this.getDiscounts()
    //this.actors = this.getActors()

    this.getFilm(this.idFilm)
    this.getRooms(this.idCinema)
    this.getProjections(this.idCinema)
    this.getCinemas()
    this.getDiscounts()
    this.getAllActors()
  },
  methods: {
    xxx (values) {
      //let obj = {...values}[0] // obj = {idRoom: 1}
      console.log('====XXX===>:', values)
    },
    echoAll () {
      console.log('================')
      console.log('idFilm', this.idFilm)
      console.log('film', this.film, typeof(this.film) )
      console.log('rooms', this.rooms, typeof(this.rooms) )
      console.log('projections', this.projections, typeof(this.projections) )
      console.log('cinemas', this.cinemas, typeof(this.cinemas) )
      console.log('discounts', this.discounts, typeof(this.discounts) )
      console.log('actors', this.discounts, typeof(this.discounts) )
      console.log('================')
    },

    deleteActor (args) {
      this.xxx(args)
      // {idRoom: 1}

      this.$myStore.backend.Films.delActor(args.idFilm, args.idActor)
      .then(res => {
        if (!res.data) {
          console.log('ERR:', res.error)
        } else {
          console.log('OK:', res.data)
          this.actors = this.actors.filter(r => r.id !== args.idActor)
        }

      })
      .catch(e => {
        console.log('ERR:', e)
      })
    },
    addActor (args) {
      this.xxx(args)

      this.$myStore.backend.Films.addActor(args.idFilm, args.idActor)
      .then(res => {
        if (!res.data) {
          console.log('ERR:', res.error)
        } else {
          console.log('OK:', res.data)
          let actor = this.allActors.find(a => a.id === args.idActor)
          this.actors.push( { ...actor, id: Number(args.idActor) } )
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
          this.projections.push( { ...args, id: Number(res.data) } )
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
          this.$myStore.backend.Reservations.pick(res.data)
          .then(res2 => {
            console.log('OK2:', res2.data)
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

    // =======================

    getFilm (idFilm) {
      // Ziskani filmu
      this.$myStore.backend.Films.getById(idFilm)
        .then(res => {
          console.log('Film is:', res)
          if (res.id === undefined) {
            throw new Error({ msg: 'Empty Film.', res })
          }
          this.film = res
          this.actors = res.actors
        })
        .catch(e => {
          console.log('ERR:', e)
          this.film = undefined
        })
    },

    getCinemas () {
      // Stazeni filmu
      this.$myStore.backend.Cinemas.getAll()
        .then(res => {
          console.log('Cinemas are:', res)
          if (res[0] === undefined) {
            throw new Error({ msg: 'Empty Cinemas.', res })
          }
          this.cinemas = res
        })
        .catch(e => {
          console.log('ERR:', e)
          this.cinemas = []
        })
    },
    getRooms () {
      // Stazeni filmu
      this.$myStore.backend.Rooms.getAll()
        .then(res => {
          console.log('Rooms are:', res)
          if (res[0] === undefined) {
            throw new Error({ msg: 'Empty Rooms.', res })
          }
          this.rooms = res
        })
        .catch(e => {
          console.log('ERR:', e)
          this.rooms = []
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
    },
    getAllActors () {
      this.$myStore.backend.Actors.getAll()
        .then(res => {
          console.log('Actors are:', res)
          if (res[0] === undefined) {
            throw new Error({ msg: 'Empty Actors', res })
          }
          this.allActors = res
        })
        .catch(e => {
          console.log('ERR:', e)
        })
    }

    // =======================

    /*
    getFilm (idFilm) {
      let film = {
        id: 1,
        released: '2017-01-01 20:00',
        name: 'Film ABC',
        duration: 60
      }
      return film
    },
    */
   /*
    getActors () {
      let actors = [
        {
          id: 1,
          firstname: 'A1',
          lastname: 20
        }
      ]
      return actors
    },
    */
    /*
    getRooms () {
      let rooms = [
        {
          id: 1,
          name: 'A1',
          capacity: 20,
          idCinema: 1
        },
        {
          id: 2,
          name: 'A2',
          capacity: 30,
          idCinema: 1
        },
        {
          id: 3,
          name: 'A3',
          capacity: 40,
          idCinema: 1
        },
        {
          id: 4,
          name: 'B1',
          capacity: 50,
          idCinema: 2
        },
        {
          id: 5,
          name: 'B2',
          capacity: 60,
          idCinema: 2
        },
        {
          id: 6,
          name: 'C1',
          capacity: 30,
          idCinema: 3
        },
        {
          id: 7,
          name: 'C2',
          capacity: 40,
          idCinema: 3
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
    getCinemas () {
      let cinemas = [
        {
          id: 1,
          name: 'KinoABC',
          address: 'Adresa 000'
        },
        {
          id: 2,
          name: 'KinoQWERT',
          address: 'Adresa 111'
        },
        {
          id: 3,
          name: 'KinoWSAD',
          address: 'Adresa 222'
        }
      ]
      return cinemas
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
    }*/
  }
}
</script>
