<template>
  <div>
    <b-table striped hover
      :fields="ticketsFields"
      :items="ticketsProvider()"
      sort-by="date">
      <template slot="film" slot-scope="row">
        <router-link class="link-as-text" :to="'/film/'+row.item.idFilm">
        {{row.item.film}}
        </router-link>
      </template>

      <template slot="cinema" slot-scope="row">
        <router-link class="link-as-text" :to="'/film/'+row.item.idCinema">
        {{row.item.cinema}}
        </router-link>
      </template>

    </b-table>
  </div>
</template>

<script>
// import axios from 'axios'
import DateTime from '@/utils/DateTime.js'

export default {
  name: 'Tickets',
  props: {
    idClient: {
      type: Number,
      default: undefined
    },
    tickets: {
      type: Array,
      default: () => []
    }
  },
  data: function () {
    return {
      ticketsList: this.tickets,
      ticketsFields: [
        { key: 'date', label: 'Datum', sortable: true },
        { key: 'time', label: 'Čas', sortable: true },
        { key: 'film', label: 'Film', sortable: true },
        { key: 'cinema', label: 'Kino', sortable: true },
        { key: 'room', label: 'Sál', sortable: true },
        { key: 'seat', label: 'Sedadlo', sortable: true },
        { key: 'price', label: 'Cena', sortable: true }
      ],
      DateTime: DateTime
    }
  },
  methods: {
    ticketsProvider: function () {
      console.log(this.tickets)
      let tickets = this.tickets.map((ticket) => {
        let res = {}
        res.id = ticket.id
        res.seat = ticket.seat
        res.datetime = new Date(ticket.datetime)
        res.date = DateTime.date2string(res.datetime, 'input')
        res.time = DateTime.time2string(res.datetime)
        res.film = ticket.film
        res.idFilm = ticket.idFilm
        res.cinema = ticket.cinema
        res.idCinema = ticket.idCinema
        res.room = ticket.room
        res.idRoom = ticket.idRoom

        res.price = this.getFinalPrice(
          ticket.price,
          ticket.salePrice,
          ticket.salePrecentage)

        /*
        res.price =
          (ticket.sale)
            ? this.getFinalPrice(
              ticket.price,
              ticket.salePrice,
              ticket.salePrecentage)
            : ticket.price
            */

        return res
      })
      return tickets
    },
    getFinalPrice: function (price, salePrice, salePercent) {
      let sale = 0
      sale += (salePrice) || 0
      sale += (salePercent) ? (price * salePercent) : 0
      let finalPrice = (price < sale) ? 0 : (price - sale)
      console.log('PRICE:', finalPrice)
      return finalPrice
    }
    /*
    downloadClietTickets: function () {
      let query = `{
        clientTickets(idClient: ${this.idClient}) {
          id
          seat
          projection {
            datetime
            price
            room {
              name
              cinema {
                id
                name
              }
            }
            type {
              film {
                id
                name
              }
            }
          }
          sale {
            price
            precentage
          }
        }
      }`
      axios.post('http://dev.mwarcz.cz', {
        query: query
      })
        .then(res => {
          this.tickets = res.data.data.clientTickets
          console.log('Tickets are downloaded.', this.tickets)
        })
        .catch(e => {
          console.log('Tickets are NOT downloaded.')
          console.log(e)
        })
    } */
  },
  mounted: function () {
    if (this.idClient !== undefined) {
      // this.downloadClietTickets()
      console.log('ASDF')

      // Stazeni projektci
      this.$myStore.backend.Tickets.getByIdClient(this.idClient)
        .then(res => {
          console.log('Tickets are:', res)
          if (res[0] === undefined) {
            throw new Error({ msg: 'Empty Tickets.', res })
          }
          this.tickets = res
        })
        .catch(e => {
          console.log('ERR:', e)
          this.tickets = []
        })
    }// if (this.idClient)
    console.log('--------------', this.tickets)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.clickable {
  cursor: pointer;
}

</style>
