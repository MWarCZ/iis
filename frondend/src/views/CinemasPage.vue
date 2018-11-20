<template>
  <div>
    <h1>Kina</h1>
    <Cinemas />
  </div>
</template>

<script>
// @ is an alias to /src
import Cinemas from '@/components/Cinemas.vue'

export default {
  name: 'CinemasPage',
  components: {
    Cinemas
  }
}
</script>
