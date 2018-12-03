<template>
  <div class="home">
    <h1>Vítejte</h1>
    TODO
    <SearchReservation v-if="!!$myStore.worker " />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import SearchReservation from '@/components/SearchReservation.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    SearchReservation
  }
}
</script>
