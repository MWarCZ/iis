<template>
  <div>
    <button @click="$router.go(-1)">Zpět</button>
    <b-card>
      <h1>Rezervace</h1>
      <Reservations :idClient="idUser" />
      <h1>Zakoupené lístky</h1>
      <Tickets :idClient="idUser"/>
    </b-card>
  </div>
</template>

<script>
import store from '@/utils/Store.js'

import Tickets from '@/components/Tickets.vue'
import Reservations from '@/components/Reservations.vue'

export default {
  name: 'AccountPage',
  components: {
    Tickets,
    Reservations
  },
  data: function () {
    return {
      idUser: store.user.id,
      store: store
    }
  }
}
</script>
