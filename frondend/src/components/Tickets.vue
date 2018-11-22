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
import axios from 'axios'
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
        { key: 'price', label: 'Cena', sortable: true }
      ],
      DateTime: DateTime
    }
  },
  methods: {
    ticketsProvider: function () {
      let tickets = this.ticketsList.map((ticket) => {
        let res = {}
        res.id = ticket.id
        res.datetime = new Date(ticket.projection.datetime)
        res.date = DateTime.date2string(res.datetime, 'input')
        res.time = DateTime.time2string(res.datetime)
        res.film = ticket.projection.type.film.name
        res.idFilm = ticket.projection.type.film.id
        res.cinema = ticket.projection.room.cinema.name
        res.idCinema = ticket.projection.room.cinema.id
        res.room = ticket.projection.room.name
        res.price =
          (ticket.sale)
            ? this.getFinalPrice(
              ticket.projection.price,
              ticket.sale.price,
              ticket.sale.precentage)
            : ticket.projection.price

        return res
      })
      return tickets
    },
    getFinalPrice: function (price, salePrice, salePercent) {
      let sale = 0
      sale += (salePrice) || 0
      sale += (salePercent) ? (price * salePercent) : 0
      let finalPrice = (price < sale) ? 0 : (price - sale)
      return finalPrice
    },
    downloadClietTickets: function () {
      let query = `{
        clientTickets(idClient: ${this.idClient}) {
          id
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
          this.ticketsList = res.data.data.clientTickets
          console.log('Tickets are downloaded.', this.ticketsList)
        })
        .catch(e => {
          console.log('Tickets are NOT downloaded.')
          console.log(e)
        })
    }
  },
  mounted: function () {
    if (this.idClient) {
      this.downloadClietTickets()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.clickable {
  cursor: pointer;
}

</style>
