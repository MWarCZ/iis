<template>
  <div class="about">

    <h1>This is an about page</h1>

    <Genres @input="showTest(...arguments)" />
    IDs: {{arr}}
    <br />
    Genres: {{genres}}

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

    Genres
  },
  data: function () {
    return {
      store: store,
      showDialog: false,
      arr: [],
      genres: []
    }
  },
  methods: {
    showTest (args) {
      let { idGenreArr, genres } = args
      this.arr = idGenreArr
      this.genres = genres
    }
  },
  created: function () {
    console.log('Query filter: ', this.$route.query.filter)
    console.log('Local Storage', localStorage)
  }
}
</script>
