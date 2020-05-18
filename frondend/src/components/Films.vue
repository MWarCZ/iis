<template>
  <div>
    <ErrorDialog
      :showDialog="failed"
      @close="failed = false"
      message="Tak toto nepůjde."
      />

    <b-card v-if="!!$myStore.worker && $myStore.worker.access >= 3">
      <h2>Akce:</h2>
      <b-button variant="outline-primary"
        @click="showDialogAddFilm = true">
        Přidat film
      </b-button>

      <Dialog v-if="showDialogAddFilm"
        @close="showDialogAddFilm = false">
        <FilmAdd
          @success="filmRefresh(...arguments); showDialogAddFilm = false" />
      </Dialog>
    </b-card>

    <b-card>
      <b-input-group prepend="Název:">
        <b-form-input v-model="filterStartName"
                      type="text"
                      label="film"
                      placeholder="Napiš název filmu.">
        </b-form-input>
      </b-input-group>

      <Genres @input="changeGenres(...arguments)" />
      <!-- <b-input-group prepend="Žánry:">
        <b-form-checkbox-group style="flex-wrap: wrap;" buttons v-model="filterGenre" >
          <b-form-checkbox class="checkbox-genre"
            v-for="(genre, index) in genres"
            :key="index"
            :value="genre.id">
            {{genre.name}}
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-input-group>  -->
    </b-card>

    <b-card class="films-box">
      <b-card v-for="(film, index) in filterFilms()"
          :key="index"
          class="films-box-item"
          >
        <router-link class="link-as-text" :to="'/film/'+film.id">
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

        <b-button v-if="!!$myStore.worker && $myStore.worker.access >= 3"
          variant="outline-danger"
          @click="removeFilm(film.id)">
          Smazat film: '{{film.name}}'
        </b-button>
      </b-card>

    </b-card>
  </div>

</template>

<script>
// import axios from 'axios'
// import DateTime from '@/utils/DateTime.js'

// import Film from '@/components/Film.vue'
import FilmAdd from '@/components/FilmAdd.vue'
import Dialog from '@/components/Dialog.vue'
import Genres from '@/components/Genres.vue'
import ErrorDialog from '@/components/ErrorDialog.vue'

export default {
  name: 'Films',
  components: {
    Dialog,
    FilmAdd,
    Genres,
    ErrorDialog
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
      films: [],
      showDialogAddFilm: false,
      failed: false
    }
  },
  methods: {
    filmRefresh (args) {
      let { film } = args
      this.films.push(film)
    },

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

    removeFilm (idFilm) {
      console.log('Remove room.')
      if (idFilm !== undefined) {
        // TODO
        this.$myStore.backend.Films.remove(idFilm)
          .then(res => {
            if (res) {
              console.log('OK')
              this.films = this.films.filter(film => {
                return film.id !== idFilm
              })
              this.$emit('success', { films: this.films })
            } else {
              console.log('KO2')
              this.failed = true
              this.$emit('fail')
            }
          })
          .catch(e => {
            console.log('KO')
            this.failed = true
            this.$emit('fail')
          })
      }
    },
    changeGenres (args) {
      // let { idGenreArr, genres } = args
      let { idGenreArr } = args
      this.filterGenre = idGenreArr
    }
  },

  mounted: function () {
    // this.downloadFilms()
    // this.downloadGenres()

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
    // Stazeni zanru
    this.$myStore.backend.Genres.getAll()
      .then(res => {
        console.log('Genres are:', res)
        if (res[0] === undefined) {
          throw new Error({ msg: 'Empty Genres.', res })
        }
        this.genres = res
      })
      .catch(e => {
        console.log('ERR:', e)
        this.genres = []
      })
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
.films-box .films-box-item {
  max-width: 450px;
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
