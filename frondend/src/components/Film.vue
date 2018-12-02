<template>
  <div>
    <div v-if="film !== undefined">
      <h2>{{film.name}}</h2>

      <b-card>

        <b-card-group>
          <b-card>
            <img src="@/assets/logo.png" :alt="film.name"/>
          </b-card>
          <b-card :title="'<b>Název: </b>' + film.name">
            <b-list-group flush>

              <b-list-group-item>
                <b>Délka:</b> {{film.duration}} (minut)
              </b-list-group-item>

              <b-list-group-item>
                <b>Premiéra:</b> {{DateTime.date2string(new Date(film.premiere))}}
              </b-list-group-item>

              <b-list-group-item v-if="film.studio">
                <b>Studio:</b> {{film.studio}}
              </b-list-group-item>
              <b-list-group-item v-else>
                <b>Studio:</b>
              </b-list-group-item>

              <b-list-group-item v-if="film.lastnameDirector">
                <b>Režisér:</b> {{film.lastnameDirector + ' ' + film.firstnameDirector}}
              </b-list-group-item>
              <b-list-group-item v-else>
                <b>Režisér:</b>
              </b-list-group-item>

              <b-list-group-item>
                <b>Herci:</b>
                <span class="comma-line"
                  v-for="(actor, index) in film.actors"
                  :key="index">
                  {{actor.lastname + ' ' + actor.firstname}}
                </span>
              </b-list-group-item>

              <b-list-group-item>
                <b>Žánry:</b>
                <b-badge class="badge-genre"
                  variant="dark"
                  v-for="(genre, index) in film.genres"
                  :key="index">
                  {{genre.name}}
                </b-badge>
              </b-list-group-item>

            </b-list-group>
          </b-card>
        </b-card-group>

        <b-card-group v-if="!!$myStore.worker && $myStore.worker.access >= 3">
          <b-card>
            <h2>Akce:</h2>
            <b-button-group vertical>
              <b-button variant="outline-primary"
                @click="showDialogEditFilm = true">
                Upravit informace
              </b-button>
              <b-button variant="outline-primary"
                @click="showDialogAddActor = true">
                Přidat herce
              </b-button>
            </b-button-group>

            <Dialog v-if="showDialogEditFilm"
              @close="showDialogEditFilm = false">
              <FilmEdit :film="film"
                @success="filmRefresh(...arguments); showDialogEditFilm = false" />
            </Dialog>
            <Dialog v-if="showDialogAddActor"
              @close="showDialogAddActor = false">
              <ActorAdd :idFilm="film.id"
                        :disabledActors="film.actors"
                        @addActor="$emit('addActor', arguments[0])"
                        @exit="showDialogAddActor = false"
                @success="/*actorRefresh(...arguments);*/ showDialogAddActor = false" />
            </Dialog>

          </b-card>
          <b-card>
            <h2>Herci:</h2>
            <ActorsList :idFilm="film.id"
                        :actors="actors /**/"
                        @deleteActor="$emit('deleteActor', arguments[0])"
                        />
          </b-card>
        </b-card-group>

        <b-card>
          <h2>Projekce</h2>
          <Projections  :idFilm="film.id"
                        :projections="projections"
                        :films="[film]"
                        :rooms="rooms"
                        :cinemas="cinemas"
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
      <h2>Film Neexistuje.</h2>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import Projections from '@/components/Projections.vue'
import ActorsList from '@/components/ActorsList.vue'
import FilmEdit from '@/components/FilmEdit.vue'
import ActorAdd from '@/components/ActorAdd.vue'
import Dialog from '@/components/Dialog.vue'
import DateTime from '@/utils/DateTime.js'

export default {
  name: 'Film',
  components: {
    Projections,
    Dialog,
    ActorsList,
    FilmEdit,
    ActorAdd
  },
  data: function () {
    return {
      // film: undefined,
      showDialogEditFilm: false,
      showDialogAddActor: false,
      DateTime: DateTime
    }
  },
  props: {
    film: {
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
    cinemas: {
      type: [Array, Function],
      default: undefined
    },
    discounts: {
      type: [Array, Function],
      default: undefined
    },
    actors: {
      type: [Array, Function],
      default: undefined
    }
  },
  methods: {
    /*
    actorsRefresh (args) {
      let { actors } = args
      this.film.actors = actors
    },
    actorRefresh (args) {
      let { actor } = args
      this.film.actors.push(actor)
    },
    filmRefresh (args) {
      let { film } = args
      this.film = film
    }*/
    providerActors(actors, idFilm) {
      let newRooms = rooms.filter(r => r.idCinema === idCinema)
      console.log('Cinema-providerRooms:', newRooms)
      return newRooms
    }

  }, // methots

  mounted: function () {
    /*
    // Ziskani filmu
    this.$myStore.backend.Films.getById(this.id)
      .then(res => {
        console.log('Film is:', res)
        if (res.id === undefined) {
          throw new Error({ msg: 'Empty Film.', res })
        }
        this.film = res
      })
      .catch(e => {
        console.log('ERR:', e)
        this.film = undefined
      })*/
  }
}
</script>

<style scoped lang="less">
.badge-genre {
  font-size: 100%;
  margin-left: 3px;
}
.comma-line:after {
  content: ', ';
  display: inline;
}
.comma-line:last-child:after {
  content: ' ';
}

</style>
