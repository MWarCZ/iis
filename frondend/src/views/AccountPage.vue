<template>
  <div>
    <button @click="$router.go(-1)">Zpět</button>
    <b-card>
      <h1>Můj účet</h1>
      <AccountClient :idClient="idUser" />
      <h2>Rezervace</h2>
      <Reservations :idClient="idUser" />
<!--
      <h2>Zakoupené lístky</h2>
      <Tickets :idClient="idUser"/>
       -->
    </b-card>
  </div>
</template>

<script>
import store from '@/utils/Store.js'

import Tickets from '@/components/Tickets.vue'
import Reservations from '@/components/Reservations.vue'
import AccountClient from '@/components/AccountClient.vue'

export default {
  name: 'AccountPage',
  components: {
    Tickets,
    Reservations,
    AccountClient
  },
  data: function () {
    return {
      idUser: Number(store.user.id),
      store: store
    }
  }
}
</script>
