<template>
  <div>

    <b-card>
      <b-input-group prepend="Název:">
        <b-form-input v-model="filterStartName"
                      type="text"
                      label="film"
                      placeholder="Napiš název filmu.">
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Žánry:">
        <b-form-checkbox-group style="flex-wrap: wrap;" buttons v-model="filterGenre" >
          <b-form-checkbox class="checkbox-genre"
            v-for="(genre, index) in genres"
            :key="index"
            :value="genre.id">
            {{genre.name}}
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-input-group>
    </b-card>

    <b-card class="films-box">
      <router-link class="link-as-text" :to="'/film/'+film.id"
        v-for="(film, index) in filterFilms()"
        :key="index">
        <b-card-group>
          <b-card :title="'<b>Název: </b>' + film.name">
            <img src="@/assets/logo.png" :alt="film.name"/>
            <b-list-group flush>

              <b-list-group-item>
                {{new Date(film.premiere).getFullYear()}}
              </b-list-group-item>

              <b-list-group-item>
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
      </router-link>

    </b-card>
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
.films-box > .card-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
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
.badge-genre {
  font-size: 100%;
  margin-left: 3px;
}
.checkbox-genre {
  &:first-child {
    margin-left: 2px;
  }
  &.btn-secondary:not(:disabled):not(.disabled).active {
    background-color: #3a50d1;
  }
  &.btn:focus, &.btn.focus {
    box-shadow: 0 0 0 0 rgba(255, 0, 255, 0.25);
  }
}

</style>
