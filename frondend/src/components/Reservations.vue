<template>
  <div style="overflow:auto">
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
    </b-table>

  </div>
</template>

<script>
// import axios from 'axios'
import DateTime from '@/utils/DateTime.js'
import Tickets from '@/components/Tickets.vue'

export default {
  name: 'Reservations',
  components: {
    Tickets
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
      fields: [
        { key: 'dateAndTime', label: 'Zarezervováno' },
        { key: 'code', label: 'Kód' },
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
    }

  },
  mounted: function () {
    // Stazeni rezervaci a listku
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
        this.$forceUpdate()
      })
      .catch(e => {
        console.log('ERR:', e)
        this.reservations = []
      })
  }
}
</script>

<style scoped lang="less">

.clickable {
  cursor: pointer;
}

</style>
