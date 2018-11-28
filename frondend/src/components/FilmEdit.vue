<template>
  <div>

    <b-card title="Upravit kino">

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

      <b-input-group prepend="Studio:">
        <b-form-select v-model="newFilm.idStudio"
                       :state="checkId(newFilm.idStudio)"
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
                       :state="checkId(newFilm.idDirector)"
                       >
          <option :value="undefined" selected> ( Vyber rezisera )</option>
          <template v-for="(director, index) in directors">
            <option :value="director.id" :key="index">
              {{director.firstname + ' ' + director.lastname}}
            </option>
          </template>
        </b-form-select>
      </b-input-group>

      <b-button variant="primary"
        @click="updateFilm()">
        Uložit
      </b-button>

    </b-card>

  </div>
</template>

<script>
export default {
  name: 'FilmEdit',
  props: {
    idFilm: {
      type: Number,
      default: undefined
    },
    film: {
      type: Object,
      default: () => {}
    }
  },
  data: function () {
    return {
      oldFilm: this.film,
      newFilm: { ...this.film },
      studios: [],
      directors: [],
      failed: false
    }
  },
  computed: {
  },
  methods: {
    checkName (name) {
      return !!name
    },
    checkId (id) {
      return typeof (id) === 'number'
    },
    updateFilm () {
      console.log('Update film.')
      if (this.checkName(this.newFilm.name)
      ) {
        // TODO
        Promise.resolve(0)
          .then(res => {
            console.log('OK')
            let director = this.directors.find(dir => dir.id === this.newFilm.idDirector)
            this.newFilm.firstnameDirector = director.firstname
            this.newFilm.lastnameDirector = director.lastname
            let studio = this.studios.find(stud => stud.id === this.newFilm.idStudio)
            this.newFilm.studio = studio.name

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
