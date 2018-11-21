<template>
  <div>
    <!--<div>
      <b-input-group v-if="idCinema === undefined"
                     prepend="Kino:">
        <b-form-select v-model="selectIdCinema">
          <option :value="undefined" selected> ( Všechna kina )</option>
          <template v-for="(cinema, index) in cinemas">
            <option :value="cinema.id" :key="index">
              {{cinema.name}}
            </option>
          </template>
        </b-form-select>
      </b-input-group>

      <b-input-group v-if="idFilm === undefined"
                     prepend="Film:">
        <b-form-input v-model="filmStartName"
                      type="text"
                      label="film"
                      placeholder="Název filmu.">
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Datum:">
        <b-form-input v-model="_date"
                      type="date">
        </b-form-input>
      </b-input-group>

    </div>-->
    <div>
      <table class="table b-table table-bordered table-striped table-hover">
        <thead>
        <tr>
          <th>Datum</th>
          <th>Čas</th>
          <th>Film</th>
          <th>Kino</th>
          <th>Sál</th>
          <th>Cena</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(ticket, index) in tickets" :key="index">
          <td>
            {{DateTime.date2string(new Date(ticket.projection.datetime))}}
          </td>
          <td>
            {{DateTime.time2string(new Date(ticket.projection.datetime))}}
          </td>
          <td>
            {{ticket.projection.type.film.name}}
          </td>
          <td>
            {{ticket.projection.room.cinema.name}}
          </td>
          <td>
            {{ticket.projection.room.name}}
          </td>
          <td>
            {{
            (ticket.sale)?
              getFinalPrice(
                ticket.projection.price,
                ticket.sale.price,
                ticket.sale.precentage)
            :ticket.projection.price

            }}
          </td>
        </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import DateTime from '@/utils/DateTime.js'

export default {
  name: 'Projections',
  props: {
    idUser: {
      type: Number,
      default: undefined
    },
  },
  data: function () {
    return {
      selectIdUser: this.idUser,
      tickets: [],
      mydate: new Date(),
      DateTime: DateTime
    }
  },
  computed: {
    _date: {
      get () {
        return DateTime.date2string(this.mydate, 'input')
      },
      set (value) {
        console.log('----------------------------')
        console.log('String Date: ', value)
        let newDate = new Date(value)
        if (isNaN(newDate.getTime())) {
          newDate = new Date()
        }
        this.mydate = newDate

        console.log('New Date: ', this.mydate)
      }
    }
  },
  methods: {
    getFinalPrice: function (price, salePrice, salePercent) {
      let sale = 0
      sale += (salePrice)?salePrice:0
      sale += (salePercent)?(price * salePercent):0
      let finalPrice = (price < sale)?0:(price-sale)
      return finalPrice
    },
    downloadTickets: function () {
      let query = `{
        clientTickets(idClient: ${this.idUser}) {
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
          this.tickets = res.data.data.clientTickets
          console.log('Tickets are downloaded.', this.tickets)
        })
        .catch(e => {
          console.log('Tickets are NOT downloaded.')
          console.log(e)
        })
    },
  },
  mounted: function () {
    this.downloadTickets()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.projections-filter-box {
  display: flex;
}

</style>
