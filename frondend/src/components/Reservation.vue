<template>
  <b-card v-if="!!projection" :title="projection.type.film.name">
    <table>
      <template v-for="(row, index) in seatsProvider(projection.room.capacity, 10, disabledSeats)">
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
    <b-button variant="primary"
      @click="$emit('success')">
      Rezervovat
    </b-button>
    <b-button variant="secondary"
      @click="$emit('fail')">
      Zrušit
    </b-button>

  </b-card>
</template>

<script>
import axios from 'axios'
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
      default: 1
    }
  },
  methods: {
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
          projection: this.projection,
          sale: undefined
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
    downloadProjectionTickets: function () {
      let query = `{
        projectionTickets(idProjection: ${this.idProjection}) {
          seat
        }
      }`
      axios.post('http://dev.mwarcz.cz', {
        query: query
      })
        .then(res => {
          this.disabledSeats = res.data.data.projectionTickets.map((ticket) => {
            return ticket.seat
          })
          console.log('disabledSeats  are downloaded.', this.disabledSeats)
        })
        .catch(e => {
          console.log('disabledSeats  are NOT downloaded.')
          console.log(e)
        })
    },

    downloadProjection: function () {
      let query = `{
        projection(id: ${this.idProjection}) {
          id
          price
          datetime
          type {
            film {
              id
              name
            }
          }
          room {
            id
            name
            capacity
            cinema {
              id
              name
            }
          }
        }
      }`
      axios.post('http://dev.mwarcz.cz', {
        query: query
      })
        .then(res => {
          this.projection = res.data.data.projection
          console.log('Projections are downloaded.', this.projection)
        })
        .catch(e => {
          console.log('Projections are NOT downloaded.')
          console.log(e)
        })
    }
  }, // methots

  mounted: function () {
    this.downloadProjection()
    this.downloadProjectionTickets()
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
