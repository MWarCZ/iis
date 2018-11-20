<template>
  <div>
    <button @click="$router.go(-1)">Zpět</button>
    <Cinema :id="idCinema"/>
  </div>
</template>

<script>
import Cinema from '@/components/Cinema.vue'

export default {
  name: 'CinemaPage',
  components: {
    Cinema
  },
  data: function () {
    return {
      idCinema: parseInt(this.$route.params.id)
    }
  }
}
</script>
