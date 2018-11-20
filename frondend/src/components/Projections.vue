<template>
  <div class="projections-wrapper">
    <div class="projections-filter-box">

      <label v-if="idCinema === undefined">Kino:
        <select v-model="selectIdCinema">
          <option value="">
          </option>
          <template
            v-for="(cinema, index) in cinemas"
            >
            <option :value="cinema.id" :key="index">
              {{cinema.name}}
            </option>
          </template>
        </select>
      </label>

      <label v-if="idFilm === undefined">Film:
        <input v-model="filmStartName">
      </label>

      <label>Datum:
        <input type="date" id="id_filter_date" v-model="_date">
      </label>

    </div>
    <div class="projections-box">
      <table>
        <tr>
          <th>Datum</th>
          <th>Čas</th>
          <th>Film</th>
          <th>Kino</th>
          <th>Sál</th>
          <th>Základní cena</th>
          <th>Akce</th>
        </tr>
        <tr v-for="(projection, index) in filterProjections()" :key="index">
          <td>
            {{DateTime.date2string(new Date(projection.datetime))}}
          </td>
          <td>
            {{time2string(new Date(projection.datetime))}}
          </td>
          <td>
            {{projection.type.film.name}}
          </td>
          <td>
            {{projection.room.cinema.name}}
          </td>
          <td>
            {{projection.room.name}}
          </td>
          <td>
            {{projection.price}}
          </td>
          <td>
            <button>Rezervovat</button>
          </td>
        </tr>
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
      projections: [],
      DateTime: DateTime
    }
  },
  computed: {
    _date: {
      get () {
        return DateTime.date2string(this.mydate, 'input')
      },
      set (value) {
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

    time2string: function (dateValue, version) {
      return dateValue.getHours() + ':' + dateValue.getMinutes()
    },

    filterProjections () {
      let projections = this.projections
      // Filtr: Film start with ...
      if (this.idFilm === undefined) {
        projections = projections.filter(projection => projection.type.film.name.toLowerCase().startsWith(this.filmStartName.toLowerCase()))
      } else {
        projections = projections.filter(projection => projection.type.film.id === this.idFilm)
      }

      // Filtr: Kino
      if (this.idCinema === undefined) {
        if (typeof (this.selectIdCinema) === 'number') {
          projections = projections.filter(projection => projection.room.cinema.id === this.selectIdCinema)
        }
      } else {
        projections = projections.filter(projection => projection.room.cinema.id === this.idCinema)
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

      return projections
    },

    downloadCinemas: function () {
      let query = `{
        cinemas {
          id
          name
        }
      }`
      axios.post('http://dev.mwarcz.cz', {
        query: query
      })
        .then(res => {
          this.cinemas = res.data.data.cinemas
          console.log('Cinemas are downloaded.', this.cinemas)
        })
        .catch(e => {
          console.log('Cinemas are NOT downloaded.')
          console.log(e)
        })
    },
    downloadFilms: function () {
      let query = `{
        films {
          id
          name
        }
      }`
      axios.post('http://dev.mwarcz.cz', {
        query: query
      })
        .then(res => {
          this.films = res.data.data.films
          console.log('Films are downloaded.', this.films)
        })
        .catch(e => {
          console.log('Films are NOT downloaded.')
          console.log(e)
        })
    },
    downloadProjections: function () {
      let query = `{
        projections {
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
          this.projections = res.data.data.projections
          console.log('Projections are downloaded.', this.projections)
        })
        .catch(e => {
          console.log('Projections are NOT downloaded.')
          console.log(e)
        })
    }
  },
  mounted: function () {
    this.downloadCinemas()
    this.downloadFilms()
    this.downloadProjections()
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

</style>
