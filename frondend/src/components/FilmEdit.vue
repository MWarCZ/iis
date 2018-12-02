<template>
  <div>

    <b-card title="Upravit film">

      <b-alert variant="danger" dismissible
        @dismissed="failed = false"
        :show="failed">
        Nepodařilo se.
      </b-alert>

      <b-input-group prepend="Název:">
        <b-form-input v-model="newFilm.name"
                  type="text"
                  label="name"
                  :state="checkName(newFilm.name)"
                  >
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Délka:" append="minut">
        <b-form-input v-model="newFilm.duration"
                  type="number"
                  label="duration"
                  :state="checkDuration(newFilm.duration)"
                  >
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Studio:">
        <b-form-select v-model="newFilm.idStudio"
                       >
          <option :value="undefined" selected> ( Vyber studio )</option>
          <template v-for="(studio, index) in studios">
            <option :value="studio.id" :key="index">
              {{studio.name}}
            </option>
          </template>
        </b-form-select>
      </b-input-group>

      <b-input-group prepend="Režisér:">
        <b-form-select v-model="newFilm.idDirector"
                       >
          <option :value="undefined" selected> ( Vyber rezisera )</option>
          <template v-for="(director, index) in directors">
            <option :value="director.id" :key="index">
              {{director.firstname + ' ' + director.lastname}}
            </option>
          </template>
        </b-form-select>
      </b-input-group>

      <Genres @input="changeGenres" :selectedGenres="newFilm.genres"/>

      <b-button variant="primary"
        @click="updateFilm()">
        Uložit
      </b-button>

    </b-card>

  </div>
</template>

<script>
import Genres from '@/components/Genres.vue'

export default {
  name: 'FilmEdit',
  components: {
    Genres
  },
  props: {
    idFilm: {
      type: Number,
      default: undefined
    },
    film: {
      type: Object,
      default: () => { genres: [] }
    }
  },
  data: function () {
    return {
      oldFilm: this.film,
      newFilm: { ...this.film },
      idGenreArr: this.genre2index(this.film.genres),
      studios: [],
      directors: [],
      failed: false
    }
  },
  computed: {
  },
  methods: {
    genre2index (genres = []) {
      let arr = genres.map(genre => genre.id)
      return arr
    },
    checkName (name) {
      return !!name
    },
    checkId (id) {
      return typeof (id) === 'number'
    },
    checkDuration (duration) {
      return duration > 0
    },
    updateFilm () {
      console.log('Update film.')
      if (this.checkName(this.newFilm.name)
      ) {
        // TODO
        this.$myStore.backend.Films.update(this.newFilm.id, this.newFilm.name, this.newFilm.premiere, this.newFilm.duration, this.newFilm.idDirector, this.newFilm.idStudio, this.idGenreArr)
          .then(res => {
            console.log('OK')

            let director = this.directors.find(dir => dir.id === this.newFilm.idDirector)
            if (director) {
              this.newFilm.firstnameDirector = director.firstname
              this.newFilm.lastnameDirector = director.lastname
            }
            let studio = this.studios.find(stud => stud.id === this.newFilm.idStudio)
            if (studio) {
              this.newFilm.studio = studio.name
            }

            this.$emit('success', { film: this.newFilm })
          })
          .catch(e => {
            console.log('KO')
            this.failed = true
            this.$emit('fail')
          })
      } else {
        this.failed = true
        this.$emit('fail')
      }
    },
    changeGenres (args) {
      let { idGenreArr, genres } = args
      this.idGenreArr = idGenreArr
      this.newFilm.genres = genres
    }
  },
  mounted: function () {
    if (this.idFilm !== undefined) {
      // Ziskani kina
      this.$myStore.backend.Films.getById(this.idFilm)
        .then(res => {
          console.log('Film is:', res)
          if (res.id === undefined) {
            throw new Error({ msg: 'Empty Film.', res })
          }
          this.oldFilm = res
          this.newFilm = { ...res }
        })
        .catch(e => {
          console.log('ERR:', e)
          this.oldFilm = undefined
        })
    }
    // Ziskani seznamu studii
    this.$myStore.backend.Studios.getAll()
      .then(res => {
        console.log('Studios are:', res)
        if (res[0] === undefined) {
          throw new Error({ msg: 'Empty Studios', res })
        }
        this.studios = res
      })
      .catch(e => {
        console.log('ERR:', e)
      })
    // Ziskani seznamu reziseru
    this.$myStore.backend.Directors.getAll()
      .then(res => {
        console.log('Directors are:', res)
        if (res[0] === undefined) {
          throw new Error({ msg: 'Empty Directors', res })
        }
        this.directors = res
      })
      .catch(e => {
        console.log('ERR:', e)
      })
  }
}
</script>

<style scoped lang="less">

</style>
