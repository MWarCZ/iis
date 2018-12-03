<template>
  <b-card v-if="!!projection" :title="projection.film">
    <table>
      <template v-for="(row, index) in seatsProvider(projection.roomCapacity, 10, disabledSeats)">
        <tr :key="index">
          <td v-for="(seat, jindex) in row" :key="jindex">
            <b-button
              @click="toggleSeat(seat.number)"
              :class="(seat.selected)?'seat selected':'seat'"
              :disabled="seat.disabled">
              {{seat.number}}
            </b-button>
          </td>
        </tr>
      </template>
    </table>

    <Tickets :x="seats" :tickets="ticketsProvider()"/>
    <h3>Ceklem: {{summaryPrice()}}</h3>

    <b-button v-if="!!$myStore.user" variant="primary"
      @click="sendReservation(); $emit('success')">
      Rezervovat
    </b-button>
    <b-button v-else-if="!!$myStore.worker" variant="primary"
      @click="sendAndSellReservation(); $emit('success')">
      Prodat
    </b-button>
    <b-button variant="secondary"
      @click="$emit('fail')">
      Zrušit
    </b-button>

  </b-card>
</template>

<script>
// import axios from 'axios'
import Tickets from '@/components/Tickets.vue'

export default {
  name: 'Reservation',
  components: {
    Tickets
  },
  data: function () {
    return {
      seats: [],
      projection: undefined,
      disabledSeats: []
    }
  },
  props: {
    idProjection: {
      type: Number,
      default: undefined
    }
  },
  methods: {
    sendReservation () {
      console.log('RESERVATION')
      // TODO
    },
    sendAndSellReservation () {

    },
    summaryPrice () {
      let tickets = this.ticketsProvider()
      let summ = 0
      tickets.forEach(ticket => {
        summ += this.getFinalPrice(ticket.price, ticket.salePrice, ticket.salePrecentage)
      })
      return summ
    },
    getFinalPrice: function (price, salePrice, salePercent) {
      let sale = 0
      sale += (salePrice) || 0
      sale += (salePercent) ? (price * salePercent) : 0
      let finalPrice = (price < sale) ? 0 : (price - sale)
      console.log('PRICE:', finalPrice)
      return finalPrice
    },

    toggleSeat (seatNumber) {
      let index = this.seats.indexOf(seatNumber)
      if (index > -1) {
        this.seats.splice(index, 1)
      } else {
        this.seats.push(seatNumber)
        this.seats = this.seats
      }
    },
    ticketsProvider () {
      let tickets = []
      tickets = this.seats.map((seat) => {
        return {
          seat: seat,
          ...this.projection,
          // TODO: Sale
          salePrice: 0,
          salePrecentage: 0
        }
      })
      console.log('TTT', tickets)
      return tickets
    },
    seatsProvider (capacity = 35, maxInRow = 10, disabledSeats = [1, 4, 6, 7, 8, 20, 21, 30, 28], selectedSeats = this.seats) {
      let seats = []
      let row = []
      for (let i = capacity; i > 0; i--) {
        row.push({
          number: i,
          disabled: (disabledSeats.indexOf(i) > -1),
          selected: (selectedSeats.indexOf(i) > -1)
        })
        if ((i % maxInRow) === 1) {
          row.reverse()
          seats.push(row)
          row = []
        }
      }
      return seats
    },
    downloadByProjection (idProjection) {
      console.log('=========1=idProjection', idProjection)
      // Ziskani projektce
      this.$myStore.backend.Projections.getById(this.idProjection)
        .then(res => {
          console.log('Projection is:', res)
          if (res.id === undefined) {
            throw new Error({ msg: 'Empty Projection.', res })
          }

          this.projection = res
        })
        .catch(e => {
          console.log('ERR:', e)
          this.projection = undefined
        })

      console.log('=========2')
      // Ziskani listku
      this.$myStore.backend.Tickets.getByIdProjection(this.idProjection)
        .then(res => {
          console.log('Tickets are:', res)
          if (res[0] === undefined) {
            throw new Error({ msg: 'Empty Tickets.', res })
          }
          this.disabledSeats = res.map((ticket) => {
            return ticket.seat
          })
        })
        .catch(e => {
          console.log('ERR:', e)
          this.disabledSeats = []
        })
      console.log('=========3')
    }
  }, // methots

  mounted: function () {
    console.log('=========0=idProjection', this.idProjection)
    this.downloadByProjection(this.idProjection)
    /*
    console.log('=========1=idProjection', this.idProjection)
    // Ziskani projektce
    this.$myStore.backend.Projections.getById(this.idProjection)
      .then(res => {
        console.log('Projection is:', res)
        if (res.id === undefined) {
          throw new Error({ msg: 'Empty Projection.', res })
        }

        this.projection = res
      })
      .catch(e => {
        console.log('ERR:', e)
        this.projection = undefined
      })

    console.log('=========2')
    // Ziskani listku
    this.$myStore.backend.Tickets.getByIdProjection(this.idProjection)
      .then(res => {
        console.log('Tickets are:', res)
        if (res[0] === undefined) {
          throw new Error({ msg: 'Empty Tickets.', res })
        }
        this.disabledSeats = res.map((ticket) => {
          return ticket.seat
        })
      })
      .catch(e => {
        console.log('ERR:', e)
        this.disabledSeats = []
      })
    console.log('=========3') */
  }
}
</script>

<style scoped lang="less">

.seat {
  &.selected {
    background-color: #3a50d1;
  }
}

</style>
