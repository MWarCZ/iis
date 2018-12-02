<template>
  <div>
    <div v-if="cinema !== undefined">
      <h2 @click="echoAll()">{{cinema.name}}</h2>

      <b-card>

        <b-card-group>
          <b-card>
            <img src="@/assets/logo.png" :alt="cinema.name"/>
          </b-card>
          <b-card :title="'<b>Název: </b>' + cinema.name">
            <b-list-group flush>

              <b-list-group-item>
                <b>Adresa:</b> {{cinema.address}}
              </b-list-group-item>

              <b-list-group-item>
                <b>Místnosti:</b>
                <span class="comma-line"
                  v-for="(room, index) in providerRooms(rooms, cinema.id)"
                  :key="index">
                  {{room.name}}({{room.capacity}} míst)
                </span>
              </b-list-group-item>

            </b-list-group>
          </b-card>
        </b-card-group>

        <b-card-group v-if="!!$myStore.worker && $myStore.worker.access >= 3">
          <b-card>
            <h2>Akce:</h2>
            <b-button-group vertical>
              <b-button variant="outline-primary"
                @click="showDialogEditCinema = true">
                Upravit informace
              </b-button>
              <b-button variant="outline-primary"
                @click="showDialogAddRoom = true">
                Přidat místnost
              </b-button>
            </b-button-group>

            <Dialog v-if="showDialogEditCinema"
              @close="showDialogEditCinema = false">
              <CinemaEdit :idCinema="cinema.id"
                          :name="cinema.name"
                          :address="cinema.address"
                          @updateCinema="$emit('updateCinema', arguments[0])"
                          @exit="showDialogEditCinema = false"
                          />
            </Dialog>
            <Dialog v-if="showDialogAddRoom"
              @close="showDialogAddRoom = false">
              <RoomAdd  :idCinema="cinema.id"
                        @addRoom="$emit('addRoom', arguments[0])"
                        @exit="showDialogAddRoom = false"
                        />
            </Dialog>

          </b-card>
          <b-card>
            <h2>Místnosti:</h2>
            <RoomsList  :rooms="providerRooms(rooms, cinema.id)"
                        @deleteRoom="$emit('deleteRoom', arguments[0])"
                        />
          </b-card>
        </b-card-group>

        <b-card>
          <h2>Projekce</h2>
          <Projections  :idCinema="cinema.id"
                        :projections="projections"
                        :cinemas="[cinema]"
                        :rooms="rooms"
                        :films="films"
                        :discounts="discounts"
                        @deleteProjection="$emit('deleteProjection', arguments[0])"
                        @addProjection="$emit('addProjection', arguments[0])"
            @addReservation="$emit('addReservation', arguments[0])"
            @addAndSellReservation="$emit('addAndSellReservation', arguments[0])"
                        />
        </b-card>

      </b-card>
    </div>
    <div v-else>
      <h2>Kino Neexistuje.</h2>
    </div>
  </div>

</template>

<script>
// import axios from 'axios'
import Projections from '@/components/Projections.vue'
import RoomsList from '@/components/RoomsList.vue'
import CinemaEdit from '@/components/CinemaEdit.vue'
import RoomAdd from '@/components/RoomAdd.vue'
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'Cinema',
  components: {
    Projections,
    RoomsList,
    CinemaEdit,
    RoomAdd,
    Dialog
  },
  data: function () {
    return {
      // cinema: undefined,
      showDialogEditCinema: false,
      showDialogAddRoom: false
    }
  },
  props: {
    cinema: {
      type: [Object, Function],
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
  methods: {
    debug (...values) {
      console.log(...values)
    },

    echoAll () {
      console.log('================')
      console.log('cinema', this.cinema, typeof(this.cinema) )
      console.log('rooms', this.rooms, typeof(this.rooms) )
      console.log('projections', this.projections, typeof(this.projections) )
      console.log('films', this.films, typeof(this.films) )
      console.log('discounts', this.discounts, typeof(this.discounts) )
      console.log('================')
    },

    /*
    roomsRefresh (args) {
      let { rooms } = args
      this.cinema.rooms = rooms
    },
    roomRefresh (args) {
      let { room } = args
      this.cinema.rooms.push(room)
    },
    cinemaRefresh (args) {
      let { cinema } = args
      this.cinema = cinema
    },
    */
    // ---------
    providerRooms(rooms, idCinema) {
      console.log('RRRRRRRRR',rooms)
      let newRooms = rooms.filter(r => r.idCinema === idCinema)
      console.log('Cinema-providerRooms:', newRooms)
      return newRooms
    }

  }, // methots

  mounted: function () {
    // this.downloadCinema()
    /*
    // Stazeni kin
    this.$myStore.backend.Cinemas.getById(this.id)
      .then(res => {
        console.log('Cinema is:', res)
        return this.$myStore.backend.Rooms.getByIdCinema(this.id)
        // return this.$myStore.backend.Rooms.getAll()
          .then(res2 => {
            // res.rooms = res2.filter(room => room.idCinema === this.id)
            res.rooms = res2
            console.log('Rooms are:', res2)
            return res
          })
          .catch(e => {
            return undefined
          })
      })
      .then(res => {
        console.log('Cinema with Rooms is:', res)
        if (res.id === undefined) {
          throw new Error({ msg: 'Empty Cinema.', res })
        }
        this.cinema = res
      })
      .catch(e => {
        console.log('ERR:', e)
        this.cinema = undefined
      })*/
  }
}
</script>

<style scoped lang="less">

.comma-line:after {
  content: ', ';
  display: inline;
}
.comma-line:last-child:after {
  content: ' '
}

</style>
