<template>
  <div style="overflow:auto" class="reservationsBox">

        <b-list-group class="reservation" v-for="(reservation, index) in reservations" :key="index" >
          <b-list-group-item>
            <b>ID: </b>{{reservation.id}}
          </b-list-group-item>

          <b-list-group-item>
            <b>Celková cena: </b>{{reservation.totalPrice}}
          </b-list-group-item>
<!--
          <b-list-group-item>
            <b>Zarezervováno v: </b>{{reservation.reserved}}
          </b-list-group-item> -->

          <b-list-group-item  v-if="!reservation.paid"
                              variant="warning">
            <b>Zaplaceno: </b> NE
          </b-list-group-item>
          <b-list-group-item  v-else
                              variant="success">
            <b>Zaplaceno: </b> ANO
          </b-list-group-item>

          <b-list-group-item  v-if="!reservation.picked"
                              variant="warning">
            <b>Vyzvednuto: </b> NE
          </b-list-group-item>
          <b-list-group-item  v-else
                              variant="success">
            <b>Vyzvednuto: </b> ANO
          </b-list-group-item>

          <b-list-group-item>
            <b>Akce: </b>
            <template v-if="!!$myStore.user && $myStore.user.id == reservation.idUser">
              <b-button v-if="!reservation.picked"
                        variant="outline-danger"
                        @click="stornoReservation(reservation.id)">
                Zrušit rezervaci
              </b-button>
            </template>

          </b-list-group-item>
          <b-list-group-item>
            <b>Více: </b>
            <template v-if="!!$myStore.user">
              <b-button
                        variant="primary"
                        @click="tickets = reservation.tickets">
                Zobrazit lístky
              </b-button>
            </template>
          </b-list-group-item>
          <br/>
        </b-list-group>
    <!--
    <b-table striped hover
      :fields="fields"
      :items="reservationsProvider()"
      sort-by="dateAndTime">
      <template slot="show_details" slot-scope="row">
        <b-button @click="row.toggleDetails()">
          {{ !row.detailsShowing ? 'Zobrazit' : 'Skrýt'}}
        </b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card>
          <Tickets :tickets="row.item.tickets"/>
        </b-card>
      </template>
      <template slot="state" slot-scope="row">
        <template v-if="!!$myStore.worker">
          <b-button variant="primary">
            Prodat
          </b-button>
        </template>
        <template v-else-if="!!$myStore.user">
          {{row.item.state}}
        </template>
      </template>
    </b-table>
 -->
    <Dialog v-if="!!tickets"
            @close="tickets = undefined">
      <b-card style="overflow: auto">
        <h1>Rezervované lístky</h1>
        <Tickets :tickets="providerTickets (tickets) " />
      </b-card>
    </Dialog>
  </div>
</template>

<script>
// import axios from 'axios'
import DateTime from '@/utils/DateTime.js'
import Tickets from '@/components/Tickets.vue'
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'Reservations',
  components: {
    Tickets,
    Dialog
  },
  props: {
    idClient: {
      type: Number,
      default: undefined
    }
  },
  data: function () {
    return {
      selectIdClient: this.idClient,
      reservations: [],
      tickets: undefined,
      fields: [
        { key: 'dateAndTime', label: 'Zarezervováno', sortable: true },
        { key: 'code', label: 'Kód', sortable: true },
        { key: 'total_price', label: 'Celková cena' },
        { key: 'show_details', label: 'Zobrazit' },
        { key: 'state', label: 'Stav' }
      ],
      mydate: new Date(),
      DateTime: DateTime
    }
  },
  methods: {
    debug (...obj) {
      console.log(...obj)
    },
    providerTickets (tickets) {
      let newTickets = tickets.map(t => {
        t.seat = t.seatNumber
        t.datetime = t.date
        return t
      })
      return newTickets
    },

    getReservationByIdClient (id) {
      this.$myStore.backend.Reservations.getByIdClient(id)
        .then(res => {
          console.log('Reservations are:', res)
          this.reservations = res
        })
        .catch(e => {
          console.log('ERR:', e)
          this.reservations = []
        })
    },

    stornoReservation (id) {
      this.$myStore.backend.Reservations.remove(id)
        .then(res2 => {
          console.log('Prodana rezervace:', res2.data)
          this.reservations = this.reservations.filter(r => r.id !== id)
        })
        .catch(e => {
          console.log('Prodana rezervace KO:', e)
        })
    },
/*
    getFinalPrice: function (price, salePrice, salePercent) {
      let sale = 0
      sale += (salePrice) || 0
      sale += (salePercent) ? (price * salePercent) : 0
      let finalPrice = (price < sale) ? 0 : (price - sale)
      return finalPrice
    },

    reservationsProvider () {
      let reservations = this.reservations
      reservations = reservations.map((item) => {
        let res = {}
        res.id = item.id
        res.code = item.code
        res.registrated = new Date(item.registrated)
        res.date = DateTime.date2string(res.registrated, 'input')
        res.time = DateTime.time2string(res.registrated)
        res.dateAndTime = res.date + ' ' + res.time
        res.tickets = item.tickets

        if (res.tickets) {
          res.total_price = res.tickets.reduce((sum, item) => {
            let price = this.getFinalPrice(
              item.price,
              item.salePrice,
              item.salePrecentage)

            return sum + price
          }, 0)
        } else {
          res.total_price = Number('NaN')
        }
        res.state = 'STAV'

        // Nutne pro aktivaci zbalovaciho obsahu
        res._showDetails = false

        return res
      })
      return reservations
    } */

  },
  mounted: function () {
    this.getReservationByIdClient(this.idClient)
    /*
    if (this.idClient !== undefined) {
      // Stazeni klientovych rezervaci a listku
      this.$myStore.backend.Reservations.getByIdClient(this.idClient)
        .then(res => {
          console.log('Reservations are:', res)
          if (res[0] === undefined) {
            throw new Error({ msg: 'Empty Reservations.', res })
          }
          // this.reservations = res
          return res
        })
        .then(res => {
          this.reservations = res
          return Promise.all(res.map(reservation => {
            return this.$myStore.backend.Tickets.getByIdReservation(reservation.id)
              .then(res2 => {
                reservation.tickets = res2
                return res2
              })
              .catch(e => {
                reservation.tickets = []
                return undefined
              })
          }))
        })
        .then(res => {
          console.log('Fin. user reservations are:', this.reservations)
          this.$forceUpdate()
        })
        .catch(e => {
          console.log('ERR:', e)
          this.reservations = []
        })
    } else {
      // Stazeni vsech rezervaci a listku
      this.$myStore.backend.Reservations.getAll()
        .then(res => {
          console.log('Reservations are:', res)
          if (res[0] === undefined) {
            throw new Error({ msg: 'Empty Reservations.', res })
          }
          // this.reservations = res
          return res
        })
        .then(res => {
          this.reservations = res
          return Promise.all(res.map(reservation => {
            return this.$myStore.backend.Tickets.getByIdReservation(reservation.id)
              .then(res2 => {
                reservation.tickets = res2
                return res2
              })
              .catch(e => {
                reservation.tickets = []
                return undefined
              })
          }))
        })
        .then(res => {
          this.$forceUpdate()
        })
        .catch(e => {
          console.log('ERR:', e)
          this.reservations = []
        })
    }*/
  }
}
</script>

<style scoped lang="less">

.reservationsBox {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.reservation {
      max-width: 300px;
}

.clickable {
  cursor: pointer;
}

</style>
