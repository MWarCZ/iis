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
                <b>Premiéra:</b> {{film.premiere}}
              </b-list-group-item>

              <b-list-group-item>
                <b>Studio:</b> {{film.studio.name}}
              </b-list-group-item>

              <b-list-group-item>
                <b>Režisér:</b> {{film.director.lastname + ' ' + film.director.firstname}}
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

export default {
  name: 'Film',
  components: {
    Projections
  },
  data: function () {
    return {
      film: undefined
    }
  },
  props: {
    id: {
      type: Number,
      default: undefined
    }
  },
  methods: {
    /*
    downloadFilm: function () {
      let query = `{
        film(id: ` + this.id + `) {
          id
          name
          duration
          premiere
          rating
          genres {
            id
            name
          }
          studio {
            id
            name
          }
          director {
            id
            firstname
            lastname
          }
          actors {
            id
            firstname
            lastname
          }
        }
      }`

      console.log('GraphQL query:', query)

      axios.post('http://dev.mwarcz.cz', {
        query: query
      })
        .then(res => {
          console.log('Film is downloaded.')
          this.film = res.data.data.film
        })
        .catch(e => {
          console.log('Film is NOT downloaded.')
          console.log(e)
        })
    } */

  }, // methots

  mounted: function () {
    // this.downloadFilm()

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
