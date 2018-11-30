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
                <b>Délka:</b> {{film.duration}}
              </b-list-group-item>

              <b-list-group-item>
                <b>Premiéra:</b> {{DateTime.date2string(new Date(film.premiere))}}
              </b-list-group-item>

              <b-list-group-item>
                <b>Studio:</b> {{film.studio}}
              </b-list-group-item>

              <b-list-group-item>
                <b>Režisér:</b> {{film.lastnameDirector + ' ' + film.firstnameDirector}}
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

        <b-card-group v-if="!!$myStore.worker">
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
                @success="actorRefresh(...arguments); showDialogAddActor = false" />
            </Dialog>

          </b-card>
          <b-card>
            <h2>Herci:</h2>
            <ActorsList :actors="film.actors"
              @success="actorsRefresh(...arguments)" />
          </b-card>
        </b-card-group>

        <b-card>
          <h2>Projekce</h2>
          <Projections :idFilm="id" />
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
      film: undefined,
      showDialogEditFilm: false,
      showDialogAddActor: false,
      DateTime: DateTime
    }
  },
  props: {
    id: {
      type: Number,
      default: undefined
    }
  },
  methods: {
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
    }

  }, // methots

  mounted: function () {
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
      })
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
/*
.film-item {
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: hidden;
  min-width: 400px;
  max-width: 800px;
  margin: auto;
}
.film-info-box {
  display: flex;
  align-items: center;
  text-align: left;
}
.film-img {
  float: left;
}
.film-info {

}
.film-genre {
  border: 1px solid black;
}
h3 {
  display: inline;
}
h3:before {
  content: ' ';
  display: block;
}
.film-info {
  overflow: auto;
}
 */
</style>
