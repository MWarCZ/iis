<template>
  <div>

    <b-input-group prepend="Žánry:">
      <b-form-checkbox-group style="flex-wrap: wrap;" buttons v-model="selectGenres" >
        <b-form-checkbox class="checkbox-genre"
          v-for="(genre, index) in listGenres"
          :key="index"
          :value="genre.id"
          @input="changeSelectedGenre()"
          >
          {{genre.name}}
        </b-form-checkbox>
      </b-form-checkbox-group>
    </b-input-group>
  </div>
</template>

<script>
export default {
  name: 'Genres',
  props: {
    genres: {
      type: Array,
      default: undefined
    },
    selectedGenres: {
      type: Array,
      default: () => []
    }
  },
  data: function () {
    return {
      listGenres: this.genres || [],
      selectGenres: this.genre2index(this.selectedGenres),
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
    changeSelectedGenre () {
      let genres = this.listGenres.filter(genre => {
        return this.selectGenres.indexOf(genre.id) >= 0
      })
      this.$emit('change', { idGenreArr: this.selectGenres, genres: genres })
      this.$emit('input', { idGenreArr: this.selectGenres, genres: genres })
    }
  },
  mounted: function () {
    if (!this.genres) {
      // Stazeni zanru
      this.$myStore.backend.Genres.getAll()
        .then(res => {
          console.log('Genres are:', res)
          if (res[0] === undefined) {
            throw new Error({ msg: 'Empty Genres.', res })
          }
          this.listGenres = res
        })
        .catch(e => {
          console.log('ERR:', e)
        })
    }
  }
}
</script>

<style scoped lang="less">

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
