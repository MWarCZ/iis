<template>
  <div class="films-wrapper">
    <div class="films-filter-box">
      <label>Nazev:
        <input v-model="filterStartName" placeholder="Napis nazev filmu">
      </label>
      <div id="films-filter-genre">
        <label v-for="(genre, index) in genres" :key="index">
          <input :value="genre.id" name="filterGenre" type="checkbox" v-model="filterGenre">
          {{genre.name}}
        </label>
      </div>
    </div>
    <!--
    <Dialog v-if="showFilm" @close="showFilm = false">
      <Film :id="selectedFilmId" />
    </Dialog>
    -->
    <div class="films-box">

      <router-link :to="'/film/'+film.id"
         class="film_item"
         v-for="(film, index) in filterFilms()"
         :key="index"
         >
      <!--<div class="films-film-item"
          v-for="(film, index) in filterFilms()"
          :key="index"
          @click="selectedFilmId = film.id; showFilm = true;"
          >-->

        <h3>{{film.name}}</h3>
        <div class="films-film-img-box">
          <img class="films-film-img" src="@/assets/logo.png" alt="film.name"/>
          <span>
            {{new Date(film.premiere).getFullYear()}}</span>
        </div>
        <span class="films-film-genre" v-for="(genre, index) in film.genres" :key="index">
          {{genre.name}}
        </span>

      <!--</div>-->
      </router-link>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import DateTime from '@/utils/DateTime.js'

// import Film from '@/components/Film.vue'
// import Dialog from '@/components/Dialog.vue'

export default {
  name: 'Films',
  components: {
    // Film,
    // Dialog
  },
  props: {
    filterForGenre: { type: Array, default: () => [] },
    filterForName: { type: String, default: '' }
  },
  data: function () {
    return {
      filterStartName: this.filterForName,
      filterGenre: this.filterForGenre,
      genres: [],
      films: []
    }
  },
  methods: {
    filterFilms: function () {
      let films = this.films

      // Filtr: Nazev
      films = films.filter(film => film.name.toLowerCase().startsWith(this.filterStartName.toLowerCase()))

      // Filtr: Zanry
      films = films.filter(film => {
        let isIn = true
        this.filterGenre.forEach(fgenre => {
          isIn = isIn && film.genres.find(genre => genre.id === fgenre)
        })
        return isIn
      })

      // Sort: A-Z
      films.sort((a, b) => {
        let nameA = a.name
        let nameB = b.name
        return nameA.localeCompare(nameB)
      })

      return films
    },

    downloadFilms: function () {
      let query = `{
        films {
          id
          name
          duration
          premiere
          rating
          genres {
            id
            name
          }
        }
      }`
      axios.post('http://dev.mwarcz.cz', {
        query: query
      })
        .then(res => {
          console.log('Films are downloaded.')
          this.films = res.data.data.films
        })
        .catch(e => {
          console.log('Films are NOT downloaded.')
          console.log(e)
        })
    },

    downloadGenres: function () {
      let query = `{
        genres {
          id
          name
        }
      }`
      axios.post('http://dev.mwarcz.cz', {
        query: query
      })
        .then(res => {
          console.log('Genres are downloaded.')
          this.genres = res.data.data.genres
        })
        .catch(e => {
          console.log('Genres are NOT downloaded.')
          console.log(e)
        })
    }
  },

  mounted: function () {
    this.downloadFilms()
    this.downloadGenres()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.films-film-item {
  overflow: hidden;
  display: block;
  max-width: 200px;
}
.films-film-img {
  /*float: left;*/
  display: block;
}
.films-film-genre {
  border: 1px solid black;
}
.films-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
