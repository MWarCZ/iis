<template>
  <div>
    <div v-if="cinema !== undefined">
      <h2>{{cinema.name}}</h2>

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
                  v-for="(room, index) in cinema.rooms"
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
              <CinemaEdit :cinema="cinema"
                @success="cinemaRefresh(...arguments); showDialogEditCinema = false" />
            </Dialog>
            <Dialog v-if="showDialogAddRoom"
              @close="showDialogAddRoom = false">
              <RoomAdd :idCinema="cinema.id"
                @success="roomRefresh(...arguments); showDialogAddRoom = false" />
            </Dialog>

          </b-card>
          <b-card>
            <h2>Místnosti:</h2>
            <RoomsList :rooms="cinema.rooms"
              @success="roomsRefresh(...arguments)" />
          </b-card>
        </b-card-group>

        <b-card>
          <h2>Projekce</h2>
          <Projections :idCinema="id" />
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
      cinema: undefined,
      showDialogEditCinema: false,
      showDialogAddRoom: false
    }
  },
  props: {
    id: {
      type: Number,
      default: undefined
    }
  },
  methods: {
    debug (...values) {
      console.log(...values)
    },
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
    }

  }, // methots

  mounted: function () {
    // this.downloadCinema()

    // Stazeni kin
    this.$myStore.backend.Cinemas.getById(this.id)
      .then(res => {
        console.log('Cinema is:', res)
        return this.$myStore.backend.Rooms.getByIdCinema(this.id)
        // return this.$myStore.backend.Rooms.getAll()
          .then(res2 => {
            //res.rooms = res2.filter(room => room.idCinema === this.id)
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
      })
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
