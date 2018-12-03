<template>
  <div class="about">

    <h1>This is an about page</h1>

    <Genres @input="showTest(...arguments)" />
    IDs: {{arr}}
    <br />
    Genres: {{genres}}
    <br />
    <button @click="getCinemas()">Cinemas</button>
    <br />
    <button @click="getCinema(1)">Cinema 1</button>
    <br />
    <button @click="getCinema(2)">Cinema 2</button>
    <br />
    <button @click="getFilm(1)">Film 1</button>
    <br />
    <button @click="getWorkers()">Workers</button>
    <br />
    <WorkersList :workers="workers"
                />

    <!-- <WorkerCreate /> -->
    <br />

    <button @click="showDialog = true">Open</button>
    <ErrorDialog
      :showDialog="showDialog"
      @close="showDialog = false"
      title="ERR" message="Tak toto nepůjde."/>

    <!--<Filter v-model="select" :listOfValues="list" />-->
    <!-- <Reservations :idClient="1" /> -->
    <!--<Tickets :idClient="1" />-->
    <!-- <Reservation /> -->

    <!-- add
    <CinemaAdd />
    edit
    <CinemaEdit :idCinema="1"/>
    <CinemaEdit :cinema="{id:10,name:'Kino Beta',address:'Adresa kina',img:'http://img.img/kino.png'}"/>
    list
    <RoomsList :rooms="[{id:1,name:'aaa',capacity:10},{id:2,name:'bbb',capacity:15},{id:3,name:'ccc',capacity:20} ]"/>
    <RoomsList :idCinema="1"/>
    add
    <RoomAdd :idCinema="1" />

    <button @click="showDialog = true">Open</button>
    <ReservationDialog
      :showDialog="showDialog"
      @close="showDialog = false"
    /> -->

    <!--
    <Dialog v-if="showDialog" @close="showDialog = false">
      <b-card>
      <Reservation
        @fail="showDialog = false"
        @success="showDialog = false"/>
      </b-card>
    </Dialog>
    -->
    <!--<Projections />-->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Film from '@/components/Film.vue'
import Dialog from '@/components/Dialog.vue'
import Projections from '@/components/Projections.vue'
import store from '@/utils/Store.js'
import Tickets from '@/components/Tickets.vue'
import Reservations from '@/components/Reservations.vue'
import Reservation from '@/components/Reservation.vue'
import ReservationDialog from '@/components/ReservationDialog.vue'

import CinemaAdd from '@/components/CinemaAdd.vue'
import CinemaEdit from '@/components/CinemaEdit.vue'
import RoomAdd from '@/components/RoomAdd.vue'
import RoomsList from '@/components/RoomsList.vue'

import Genres from '@/components/Genres.vue'

import ErrorDialog from '@/components/ErrorDialog.vue'
import WorkerCreate from '@/components/WorkerCreate.vue'
import WorkersList from '@/components/WorkersList.vue'

export default {
  name: 'About',
  components: {
    ReservationDialog,
    Film,
    Dialog,
    Projections,
    Tickets,
    Reservations,
    Reservation,

    CinemaAdd,
    CinemaEdit,
    RoomAdd,
    RoomsList,

    Genres,
    ErrorDialog,
    WorkerCreate,
    WorkersList
  },
  data: function () {
    return {
      store: store,
      showDialog: false,
      arr: [],
      genres: [],
      workers: () => []
    }
  },
  methods: {
    showTest (args) {
      let { idGenreArr, genres } = args
      this.arr = idGenreArr
      this.genres = genres
    },

    getWorkers () {
      this.$myStore.backend.Workers.getAll()
        .then(res => {
          console.log('Workers are:', res)
          if (res[0] === undefined) {
            throw new Error({ msg: 'Empty Workers.', res })
          }
          this.workers = res
        })
        .catch(e => {
          console.log('ERR:', e)
          this.workers = []
        })
    },

    getFilm (idFilm) {
      // Ziskani filmu
      this.$myStore.backend.Films.getById(idFilm)
        .then(res => {
          console.log('Film is:', res)
          if (res.id === undefined) {
            throw new Error({ msg: 'Empty Film.', res })
          }
          this.film = res
        })
        .catch(e => {
          console.log('ERR:', e)
          this.film = undefined
        })
    },

    getCinemas () {
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

    getGenres () {
      // Stazeni zanru
      this.$myStore.backend.Genres.getAll()
        .then(res => {
          console.log('Genres are:', res)
          if (res[0] === undefined) {
            throw new Error({ msg: 'Empty Genres.', res })
          }
          this.genres = res
        })
        .catch(e => {
          console.log('ERR:', e)
          this.genres = []
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

  },
  created: function () {
    console.log('Query filter: ', this.$route.query.filter)
    console.log('Local Storage', localStorage)
  }
}
</script>
