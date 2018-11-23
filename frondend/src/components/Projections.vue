<template>
  <div>
    <div class="projections-filter-box">

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

    </div>
    <div>

      <b-table striped hover
        :fields="fields"
        :items="projectionsProvider()"
        sort-by="date">
        <template slot="event" slot-scope="data">
          <b-button v-if="!!$myStore.user"
            @click="showDialog = true">
            Rezervovat
          </b-button>
          <span v-else>Rezervace jen pro přihlašené.</span>
        </template>
      </b-table>

      <ReservationDialog
        :showDialog="showDialog"
        @close="showDialog = false" />

    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import DateTime from '@/utils/DateTime.js'
// import store from '@/utils/Store.js'
import ReservationDialog from '@/components/ReservationDialog.vue'

export default {
  name: 'Projections',
  components: {
    ReservationDialog
  },
  props: {
    idCinema: {
      type: Number,
      default: undefined
    },
    idFilm: {
      type: Number,
      default: undefined
    },
    valueDate: {
      type: String
    }
  },
  data: function () {
    return {
      selectIdCinema: this.idCinema,
      filmStartName: '',
      cinemas: [],
      films: [],
      mydate: new Date(),
      showDialog: false,
      projections: [],
      fields: [
        { key: 'date', label: 'Datum', sortable: true },
        { key: 'time', label: 'Čas', sortable: true },
        { key: 'film', label: 'Film', sortable: true },
        { key: 'cinema', label: 'Kino', sortable: true },
        { key: 'room', label: 'Sál', sortable: true },
        { key: 'price', label: 'Základní cena', sortable: true },
        { key: 'event', label: 'Akce' }
      ],
      // store: store,
      DateTime: DateTime
    }
  },
  computed: {
    _date: {
      get () {
        return DateTime.date2string(this.mydate, 'input')
      },
      set (value) {
        let newDate = new Date(value)
        if (isNaN(newDate.getTime())) {
          newDate = new Date()
        }
        this.mydate = newDate
      }
    }
  },
  methods: {
    projectionsProvider () {
      let projections = this.filterProjections()
      projections = projections.map((item) => {
        let res = {}
        res.id = item.id
        res.datetime = new Date(item.datetime)
        res.date = DateTime.date2string(res.datetime, 'input')
        res.time = DateTime.time2string(res.datetime)
        res.film = item.film
        res.idFilm = item.idFilm
        res.cinema = item.cinema
        res.idCinema = item.idCinema
        res.room = item.room
        res.idRoom = item.idRoom
        res.price = item.price

        return res
      })
      return projections
    },

    filterProjections () {
      let projections = this.projections
      // Filtr: Film start with ...
      if (this.idFilm === undefined) {
        projections = projections.filter(projection => projection.film.toLowerCase().startsWith(this.filmStartName.toLowerCase()))
      } else {
        projections = projections.filter(projection => projection.idFilm === this.idFilm)
      }

      // Filtr: Kino
      if (this.idCinema === undefined) {
        if (typeof (this.selectIdCinema) === 'number') {
          projections = projections.filter(projection => projection.idCinema === this.selectIdCinema)
        }
      } else {
        projections = projections.filter(projection => projection.idCinema === this.idCinema)
      }

      // Filtr: Od data
      console.log('date:', this.mydate)
      projections = projections.filter(projection => new Date(projection.datetime) >= this.mydate)

      // Sort: Date Time
      projections.sort((a, b) => {
        let dateA = new Date(a.datetime)
        let dateB = new Date(b.datetime)
        if (dateA < dateB) { return -1 } else if (dateA > dateB) { return 1 }
        return 0
      })

      console.log('>PROJ:', projections)
      return projections
    }

  },
  mounted: function () {
    // Stazeni kin
    this.$myStore.backend.Cinemas.getAll()
      .then(res => {
        console.log('Cinemas are:', res)
        if (res[0] === undefined) {
          throw new Error({ msg: 'Empty Cinemas.', res })
        }
        this.cinemas = res
      })
      .catch(e => {
        console.log('ERR:', e)
        this.cinemas = []
      })

    // Stazeni filmu
    this.$myStore.backend.Films.getAll()
      .then(res => {
        console.log('Films are:', res)
        if (res[0] === undefined) {
          throw new Error({ msg: 'Empty Films.', res })
        }
        this.films = res
      })
      .catch(e => {
        console.log('ERR:', e)
        this.films = []
      })

    // Stazeni projektci
    this.$myStore.backend.Projections.getAll()
      .then(res => {
        console.log('Projections are:', res)
        if (res[0] === undefined) {
          throw new Error({ msg: 'Empty Projections.', res })
        }
        this.projections = res
      })
      .catch(e => {
        console.log('ERR:', e)
        this.projections = []
      })
  }
/*
  // <h1>{{ msg }}</h1>
  props: {
    msg: String
  },
  */
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.projections-filter-box {
  display: flex;
}

</style>
