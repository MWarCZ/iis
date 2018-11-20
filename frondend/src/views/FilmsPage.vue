<template>
  <div>
    <h1>Filmy</h1>
    <Films />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Films from '@/components/Films.vue'

export default {
  name: 'FilmsPage',
  components: {
    Films
  }
}
</script>
