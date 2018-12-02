<template>
  <div>
    <button @click="$router.go(-1)">Zpět</button>
    <!-- <Film :id="idFilm"/> -->
    <Film   :film="film"
            :rooms="rooms"
            :projections="projections"
            :cinemas="cinemas"
            :discounts="discounts"
            :actors="actors"
            @deleteRoom="xxx(arguments[0])"
            @updateFilm="xxx(arguments[0])"
            @addActor="xxx(arguments[0])"
            @addProjection="(xxx(arguments[0]))"
            @deleteProjection="(xxx(arguments[0]))"
            @addReservation="(xxx(arguments[0]))"
            @addAndSellReservation="(xxx(arguments[0]))"
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
      actors: () => []
    }
  },
  created () {
    this.film = this.getFilm(this.idFilm)
    this.rooms = this.getRooms(this.idCinema)
    this.projections = this.getProjections(this.idCinema)
    this.cinemas = this.getCinemas()
    this.discounts = this.getDiscounts()
    this.actors = this.getActors()
  },
  methods: {
    xxx (values) {
      //let obj = {...values}[0] // obj = {idRoom: 1}
      console.log('====XXX===>:', values)
    },

    getFilm (idFilm) {
      let film = {
        id: 1,
        released: '2017-01-01 20:00',
        name: 'Film ABC',
        duration: 60
      }
      return film
    },
    getActors () {
      let actors = [
        {
          id: 1,
          firstname: 'A1',
          lastname: 20
        }
      ]
      return rooms
    },
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
    }
  }
}
</script>
