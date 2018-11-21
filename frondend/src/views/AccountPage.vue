<template>
  <div>
    <button @click="$router.go(-1)">Zpět</button>
    <b-card>
      <h1>Zakoupené lístky</h1>
      <Tickets :idUser="idUser"/>
    </b-card>
  </div>
</template>

<script>
import Tickets from '@/components/Tickets.vue'
import store from '@/utils/Store.js'

export default {
  name: 'AccountPage',
  components: {
    Tickets
  },
  data: function () {
    return {
      idUser: store.user.id,
      store: store
    }
  }
}
</script>
