<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!--<Filter v-model="select" :listOfValues="list" />-->
    <button @click="showDialog = true">Open</button>
    <Dialog v-if="showDialog" @close="showDialog = false">
      <Film :id="1" />
    </Dialog>
    <Projections />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Film from '@/components/Film.vue'
import Dialog from '@/components/Dialog.vue'
import Projections from '@/components/Projections.vue'

export default {
  name: 'About',
  data: () => ({
    showDialog: false
  }),
  components: {
    Film,
    Dialog,
    Projections
  },
  created: function () {
    console.log('Query filter: ', this.$route.query.filter)
  }
}
</script>
