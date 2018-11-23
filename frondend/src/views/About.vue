<template>
  <div class="about">
    {{store}}
    <h1>This is an about page</h1>
    <!--<Filter v-model="select" :listOfValues="list" />-->
    <Reservations :idClient="1" />
    <!--<Tickets :idClient="1" />-->
    <Reservation />
    <button @click="showDialog = true">Open</button>
    <ReservationDialog
      :showDialog="showDialog"
      @close="showDialog = false"
    />
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

export default {
  name: 'About',
  data: () => ({
    store: store,
    showDialog: false
  }),
  components: {
    ReservationDialog,
    Film,
    Dialog,
    Projections,
    Tickets,
    Reservations,
    Reservation
  },
  created: function () {
    console.log('Query filter: ', this.$route.query.filter)
    console.log('Local Storage', localStorage)
  }
}
</script>
