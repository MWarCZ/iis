<template>
  <div>
    <b-card v-if="!!$myStore.worker && $myStore.worker.access >= 3">
      <h2>Akce:</h2>
      <b-button variant="outline-primary"
        @click="showDialogAddCinema = true">
        Přidat kino
      </b-button>

      <Dialog v-if="showDialogAddCinema"
        @close="showDialogAddCinema = false">
        <CinemaAdd
          @success="cinemaRefresh(...arguments); showDialogAddCinema = false" />
      </Dialog>
    </b-card>

    <b-card>

      <b-card v-for="(cinema, index) in cinemasProvider()"
          :key="index"
          >
        <router-link class="link-as-text" :to="'/cinema/'+cinema.id"
          >
          <b-card-group>
            <b-card>
              <img src="@/assets/logo.png" :alt="cinema.name"/>
            </b-card>
            <b-card :title="'<b>Název: </b>' + cinema.name">
              <b-list-group flush>

                <b-list-group-item>
                  <b>Adresa:</b> {{cinema.address}}
                </b-list-group-item>

              </b-list-group>
            </b-card>
          </b-card-group>
        </router-link>

        <b-button v-if="!!$myStore.worker && $myStore.worker.access >= 3"
          variant="outline-danger"
          @click="removeCinema(cinema.id)">
          Smazat kino: '{{cinema.name}}'
        </b-button>
      </b-card>

    </b-card>
  </div>

</template>

<script>
import CinemaAdd from '@/components/CinemaAdd.vue'
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'Cinemas',
  components: {
    CinemaAdd,
    Dialog
  },
  props: {
  },
  data: function () {
    return {
      cinemas: [],
      showDialogAddCinema: false
    }
  },
  methods: {
    cinemasProvider () {
      let cinemas = this.cinemas.map(item => item)
      cinemas.sort((a, b) => {
        let nameA = a.name
        let nameB = b.name
        return nameA.localeCompare(nameB)
      })
      return cinemas
    },

    cinemaRefresh (args) {
      let { cinema } = args
      this.cinemas.push(cinema)
    },

    removeCinema (idCinema) {
      console.log('Remove room.')
      if (idCinema !== undefined) {
        // TODO
        this.$myStore.backend.Cinemas.remove(idCinema)
          .then(res => {
            if(res) {
              this.cinemas = this.cinemas.filter(cinema => {
                return cinema.id !== idCinema
              })
              console.log('OK')
              this.$emit('success', { cinemas: this.cinemas })
            } else {
              console.log('KO')
              this.$emit('fail')
            }
          })
          .catch(e => {
            console.log('KO')
            this.$emit('fail')
          })
      }
    }

  },
  mounted: function () {
    // this.downloadCinemas()

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
  }
}
</script>

<style scoped lang="less">
.link-as-text {
  color: #2c3e50;
  text-decoration: none;
}
.link-as-text:hover {
  color: #2c3e50;
  text-decoration: none;

  .card, .list-group-item {
    background-color: #eee;
  }
}
/*
.cinemas-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: black 1px solid;
}
h3 {
  display: inline;
}
h3:before {
  content: ' ';
  display: block;
}
*/
</style>
