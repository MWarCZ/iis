<template>
  <div>

    <b-card title="Přidat film">

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

      <b-input-group prepend="Premiéra:">
        <b-form-input v-model="_date"
                  type="date"
                  label="premiere"
                  :state="checkPremiere(premiere)"
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

      <Genres @input="changeGenres"/>

      <b-button variant="primary"
        @click="addFilm()">
        Přidat
      </b-button>

    </b-card>

  </div>
</template>

<script>
import DateTime from '@/utils/DateTime.js'
import Genres from '@/components/Genres.vue'

export default {
  name: 'FilmAdd',
  components: {
    Genres
  },
  props: {
  },
  data: function () {
    return {
      newFilm: {
        idDirector: null,
        idStudio: null
      },
      studios: [],
      directors: [],
      premiere: new Date(),
      genres: [],
      idGenreArr: [],
      failed: false
    }
  },
  computed: {
    _date: {
      get () {
        return DateTime.date2string(this.premiere, 'input')
      },
      set (value) {
        let newDate = new Date(value)
        if (isNaN(newDate.getTime())) {
          newDate = new Date()
        }
        this.premiere = newDate
      }
    }
  },
  methods: {
    checkName (name) {
      return !!name
    },
    checkPremiere (date) {
      return !!date
    },
    checkDuration (duration) {
      return duration > 0
    },
    addFilm () {
      console.log('Add film.')
      if (this.checkName(this.newFilm.name) &&
        this.checkPremiere(this.premiere)
      ) {
        this.newFilm.premiere = this._date
        // name, premiere, duration, idDirector, idStudio
        this.$myStore.backend.Films.create(this.newFilm.name, this.newFilm.premiere, this.newFilm.duration, this.newFilm.idDirector, this.newFilm.idStudio, this.idGenreArr)
          .then(res => {
            this.newFilm.id = res.data
            console.log('OK')
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
      this.genres = genres
      this.newFilm.genres = genres
    }
  },
  mounted: function () {
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
