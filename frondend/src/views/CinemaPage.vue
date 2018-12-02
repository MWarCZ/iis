<template>
  <div>
    <button @click="$router.go(-1)">Zpět</button>
    <!-- <Cinema :id="idCinema"/> -->
    <Cinema :cinema="cinema"
            :rooms="rooms"
            :projections="projections"
            :films="films"
            :discounts="discounts"
            @deleteRoom="xxx(arguments[0])"
            @updateCinema="xxx(arguments[0])"
            @addRoom="xxx(arguments[0])"
            @addProjection="(xxx(arguments[0]))"
            @deleteProjection="(xxx(arguments[0]))"
            @addReservation="(xxx(arguments[0]))"
            @addAndSellReservation="(xxx(arguments[0]))"
            />
  </div>
</template>

<script>
import Cinema from '@/components/Cinema.vue'

export default {
  name: 'CinemaPage',
  components: {
    Cinema
  },
  data: function () {
    return {
      idCinema: parseInt(this.$route.params.id),
      cinema: () => {},
      rooms: () => [],
      projections: () => [],
      films: () => [],
      discounts: () => []
    }
  },
  created () {
    this.cinema = this.getCinema(this.idCinema)
    this.rooms = this.getRooms(this.idCinema)
    this.projections = this.getProjections(this.idCinema)
    this.films = this.getFilms()
    this.discounts = this.getDiscounts()
  },
  methods: {
    xxx (values) {
      //let obj = {...values}[0] // obj = {idRoom: 1}
      console.log('====XXX===>:', values)
    },

    getCinema (idCinema) {
      let cinema = {
        id: 1,
        name: 'KinoABC',
        address: 'Adresa kina abc'
      }
      return cinema
    },
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
