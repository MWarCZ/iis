<template>
  <div class="film-wrapper">
    <div v-if="film !== undefined">
      <h2>{{film.name}}</h2>
      <div class="film-item">
        <div class="film-info-box">
          <img class="film-img" src="@/assets/logo.png" :alt="film.name"/>

          <div class="film-info">
            <h3>Délka:</h3>
            {{film.duration}}

            <h3>Premiéra:</h3>
            {{film.premiere}}

            <h3>Studio:</h3>
            {{film.studio.name}}

            <h3>Žánry:</h3>
            <span class="film-genre"
              v-for="(genre, index) in film.genres"
              :key="index"
              >
              {{genre.name}}
            </span>
          </div>
        </div>

        <div class="film-projections">
          <h2>Projekce</h2>
          <Projections :idFilm="id" />
        </div>

      </div>

    </div>
    <div v-else>
      <h2>Film Neexistuje!</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
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
    }

  }, // methots

  created: function () {
    this.downloadFilm()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
</style>
