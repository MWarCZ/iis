<template>
  <div style="overflow: auto">

    <div v-if="!!$myStore.worker && $myStore.worker.access >= 3">
      <b-button-group>
        <b-button variant="outline-primary"
          @click="showDialogAddProjection = true">
          Přidat projekci
        </b-button>
      </b-button-group>

      <Dialog v-if="showDialogAddProjection"
        @close="showDialogAddProjection = false">
        <ProjectionAdd  :idCinema="idCinema"
                        :idFilm="idFilm"
                        :cinemas="cinemas"
                        :films="films"
                        :rooms="rooms"
                        @addProjection="$emit('addProjection', arguments[0])"
                        @exit="showDialogAddProjection = false"
                        />
      </Dialog>
    </div>

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
        :items="providerProjections(projections)"
        sort-by="date">
        <template slot="event" slot-scope="data">
          <b-button v-if="!!$myStore.user"
            @click="reservationNow(data.item.id); showDialog = true">
            Rezervovat
          </b-button>
          <template v-else-if="!!$myStore.worker && $myStore.worker.access >= 2">
            <b-button v-if="!!$myStore.worker"
              variant="outline-primary"
              @click="reservationNow(data.item.id); showDialog = true">
              Prodat
            </b-button>
            <b-button v-if="!!$myStore.worker && $myStore.worker.access >= 3"
              variant="outline-danger"
              @click="$emit('deleteProjection', { idProjection: data.item.id })"
              >
              Smazat
            </b-button>
          </template>
          <span v-else>Rezervace jen pro přihlašené.</span>
        </template>
      </b-table>

      <!-- <ReservationDialog
        :idProjection="idProjectionSelected"
        :showDialog="showDialog"
        @close="showDialog = false" /> -->

      <Dialog v-if="showDialog" @close="showDialog = false">
        <b-card style="overflow:auto">
          <Reservation
            :projection="getOneProjection(idProjectionSelected)"
            :idClient="idClient"

            :projections="projections"
            :rooms="rooms"
            :films="films"
            :discounts="discounts"

            @addReservation="$emit('addReservation', arguments[0])"
            @addAndSellReservation="$emit('addAndSellReservation', arguments[0])"
            @exit="showDialog = false"
            />
        </b-card>
      </Dialog>

    </div>
  </div>
</template>

<script>
import DateTime from '@/utils/DateTime.js'
import ReservationDialog from '@/components/ReservationDialog.vue'

import Dialog from '@/components/Dialog.vue'
import ProjectionAdd from '@/components/ProjectionAdd.vue'
import Reservation from '@/components/Reservation.vue'

export default {
  name: 'Projections',
  components: {
    ReservationDialog,
    Dialog,
    ProjectionAdd,
    Reservation
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

    cinemas: {
      type: [Array, Function],
      default: undefined
    },
    rooms: {
      type: [Array, Function],
      default: undefined
    },
    projections: {
      type: [Array, Function],
      default: undefined
    },
    films: {
      type: [Array, Function],
      default: undefined
    },
    discounts: {
      type: [Array, Function],
      default: undefined
    }
  },
  data: function () {
    return {
      selectIdCinema: this.idCinema,
      filmStartName: '',
      // cinemas: [],
      // films: [],
      mydate: new Date(),
      showDialog: false,
      // projections: [],
      fields: [
        { key: 'date', label: 'Datum', sortable: true },
        { key: 'time', label: 'Čas', sortable: true },
        { key: 'film', label: 'Film', sortable: true },
        { key: 'cinema', label: 'Kino', sortable: true },
        { key: 'room', label: 'Sál', sortable: true },
        { key: 'price', label: 'Základní cena', sortable: true },
        { key: 'event', label: 'Akce' }
      ],
      showDialogAddProjection: false,
      // idProjectionSelected: 5,
      idClient: null,
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
    providerProjections (projections, filtrOn = true) {
      console.log('Projections-providerProjections-in:', projections)
      let newProjections = projections.map(item => {
        let newItem = { ...item }

        newItem.idFilm = item.idFilm
        newItem.film = this.films.find(fim => fim.id === item.idFilm)
        if (newItem.film) {
          newItem.film = newItem.film.name
        } else {
          newItem.film = ''
        }
        return newItem
      })

      newProjections = newProjections.map((item) => {
        let res = {}
        res.id = item.id
        res.datetime = new Date(item.datetime)
        res.date = DateTime.date2string(res.datetime, 'input')
        res.time = DateTime.time2string(res.datetime)

        res.idFilm = item.idFilm
        res.film = this.films.find(fim => fim.id === item.idFilm)
        if (res.film) {
          res.film = res.film.name
        }

        res.idRoom = item.idRoom
        res.room = this.rooms.find(r => r.id === item.idRoom)
        if (res.room) {
          res.idCinema = res.room.idCinema
          res.roomCapacity = res.room.capacity
          res.room = res.room.name
        }

        res.cinema = this.cinemas.find(c => c.id === res.idCinema)
        if (res.cinema) {
          res.cinema = res.cinema.name
        }
        res.price = item.price

        return res
      })
      // console.log('Projections-providerProjections-x:', newProjections)
      if (filtrOn) {
        newProjections = this.filterProjections(
          newProjections,
          this.idFilm,
          this.idCinema,
          this.filmStartName,
          this.selectIdCinema,
          this.mydate
        )
      }

      console.log('Projections-providerProjections-out:', newProjections)
      return newProjections
    },

    getOneProjection (idProjection) {
      let projections = this.providerProjections(this.projections, false)
      let projection = projections.find(proj => proj.id === idProjection)
      return projection
    },

    filterProjections (projectionsX, idFilm, idCinema, filmStartName, selectIdCinema, date) {
      console.log('Projections-filterProjections-in:', projectionsX)
      console.log('idFilm', idFilm, 'IdCinema', idCinema)
      let projections = projectionsX
      // Filtr: Film start with ...
      if (idFilm === undefined) {
        projections = projections.filter(projection => {
          return projection.film.toLowerCase().startsWith(filmStartName.toLowerCase())
        })
      } else {
        projections = projections.filter(projection => projection.idFilm === idFilm)
      }

      // Filtr: Kino
      if (idCinema === undefined) {
        if (typeof (selectIdCinema) === 'number') {
          projections = projections.filter(projection => projection.idCinema === selectIdCinema)
        }
      } else {
        projections = projections.filter(projection => projection.idCinema === idCinema)
      }

      // Filtr: Od data
      //
      projections = projections.filter(projection => new Date(projection.datetime) >= date)

      // Sort: Date Time
      projections.sort((a, b) => {
        let dateA = new Date(a.datetime)
        let dateB = new Date(b.datetime)
        if (dateA < dateB) { return -1 } else if (dateA > dateB) { return 1 }
        return 0
      })

      console.log('Projections-filterProjections-out:', projections)
      return projections
    },

    // ------------------------
    reservationNow (idProjection) {
      this.idProjectionSelected = idProjection
      this.idClient = (this.$myStore.user) ? Number(this.$myStore.user.id) : null
    },
    /*
    projectionRefresh (args) {
      let { projection } = args
      this.projections.push(projection)
    },
    */
    removeProjection (idProjection) {
      /*
      console.log('Remove room.')
      if (idProjection !== undefined) {
        // TODO
        this.$myStore.backend.Projections.remove(idProjection)
          .then(res => {
            console.log('OK')
            this.projections = this.projections.filter(proj => {
              return proj.id !== idProjection
            })
            this.$emit('success', { projections: this.projections })
          })
          .catch(e => {
            console.log('KO')
            this.$emit('fail')
          })
      } */
    }
    /*
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
    }, */

    /*
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
      //
      projections = projections.filter(projection => new Date(projection.datetime) >= this.mydate)

      // Sort: Date Time
      projections.sort((a, b) => {
        let dateA = new Date(a.datetime)
        let dateB = new Date(b.datetime)
        if (dateA < dateB) { return -1 } else if (dateA > dateB) { return 1 }
        return 0
      })

      // console.log('>PROJ:', projections)
      return projections
    } */

  },
  mounted: function () {

    /*
    console.log('==USER++', this.$myStore.user)
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
      }) */
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
