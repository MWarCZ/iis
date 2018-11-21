<template>
  <div class="about">
    {{store}}
    <h1>This is an about page</h1>
    <!--<Filter v-model="select" :listOfValues="list" />-->
    <Tickets :idUser="1" />
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
import store from '@/utils/Store.js'
import Tickets from '@/components/Tickets.vue'

export default {
  name: 'About',
  data: () => ({
    store: store,
    showDialog: false
  }),
  components: {
    Film,
    Dialog,
    Projections,
    Tickets
  },
  created: function () {
    console.log('Query filter: ', this.$route.query.filter)
    console.log('Local Storage', localStorage)
  }
}
</script>
