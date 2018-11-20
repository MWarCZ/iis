<template>
  <div>
    <button @click="$router.go(-1)">Zpět</button>
    <Film :id="idFilm"/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Film from '@/components/Film.vue'

export default {
  name: 'FilmPage',
  components: {
    Film
  },
  data: function () {
    return {
      idFilm: parseInt(this.$route.params.id)
    }
  }
}
</script>
