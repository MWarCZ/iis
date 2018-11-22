<template>
  <div>
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

    <!--
    <b-card>
      <b-list-group flush>

        <b-list-group-item v-for="(reservation, index) in reservations"
          :key="index">

          <b>{{reservation.code}}</b> |
          {{DateTime.date2string(new Date(reservation.registrated),'input')}} |
          {{DateTime.time2string(new Date(reservation.registrated))}} |
          <b-button v-b-toggle="'r'+index">Zobrazit více</b-button>
          <b-collapse :id="'r'+index">
              <Tickets :tickets="reservation.tickets" />
          </b-collapse>

        </b-list-group-item>

      </b-list-group>
    </b-card>

    <b-table striped hover :fields="fields" :items="reservations">
      <template slot="registrated" slot-scope="data">
        {{DateTime.date2string(new Date(data.item.registrated),'input')}} {{DateTime.time2string(new Date(data.item.registrated))}}
      </template>
    </b-table>
    -->
  </div>
</template>

<script>
import axios from 'axios'
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
        { key: 'dateAndTime', label: 'Zarezervováno'},
        { key: 'code', label: 'Kód'},
        { key: 'show_details', label: 'Zobrazit'},
        { key: 'state', label: 'Stav'}
      ],
      mydate: new Date(),
      DateTime: DateTime
    }
  },
  methods: {
    debug (...obj) {
      console.log(...obj)
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
        res.state = 'STAV'

        // Nutne pro aktivaci zbalovaciho obsahu
        res._showDetails = false

        return res
      })
      return reservations
    },

    downloadReservations: function () {
      let query = `{
        clientReservations(idClient: ${this.idClient}) {
          id
          code
          registrated
          tickets {
            sale {
              price
              precentage
            }
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
          }
        }
      }`
      axios.post('http://dev.mwarcz.cz', {
        query: query
      })
        .then(res => {
          this.reservations = res.data.data.clientReservations
          console.log('Reservations are downloaded.', this.reservations)
        })
        .catch(e => {
          console.log('Reservations are NOT downloaded.')
          console.log(e)
        })
    }
  },
  mounted: function () {
    this.downloadReservations()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.clickable {
  cursor: pointer;
}

</style>
