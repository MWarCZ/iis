<template>
  <div>

    <b-card title="Vyhledat rezervaci">

      <b-alert variant="danger" dismissible
        @dismissed="failed = false"
        :show="failed">
        Nenalezena.
      </b-alert>

      <b-input-group prepend="ID Rezervace:">
        <b-form-input v-model="idReservation"
                  type="number"
                  label="idReservation"
                  >
        </b-form-input>
        <b-button variant="outline-primary"
                  @click="getReservationById(idReservation)"
                  >
          Vyhledat
        </b-button>
      </b-input-group>

      <b-alert v-if="!reservation"
        variant="danger"
        :show="true">
        Nenalezena.
      </b-alert>
      <template v-if="reservation">
        <b-list-group v-if="!!$myStore.worker || (!!$myStore.user && $myStore.user.id == reservation.idUser)">
          <b-list-group-item>
            <b>ID: </b>{{reservation.id}}
          </b-list-group-item>

          <b-list-group-item>
            <b>Celková cena: </b>{{reservation.totalPrice}}
          </b-list-group-item>

          <b-list-group-item  v-if="!reservation.paid"
                              variant="warning">
            <b>Zaplaceno: </b> NE
          </b-list-group-item>
          <b-list-group-item  v-else
                              variant="success">
            <b>Zaplaceno: </b> ANO
          </b-list-group-item>


          <b-list-group-item  v-if="!reservation.picked"
                              variant="warning">
            <b>Vyzvednuto: </b> NE
          </b-list-group-item>
          <b-list-group-item  v-else
                              variant="success">
            <b>Vyzvednuto: </b> ANO
          </b-list-group-item>

          <b-list-group-item>
            <b>Akce: </b>
            <template v-if="!!$myStore.user && $myStore.user.id == reservation.idUser">
              <b-button v-if="!reservation.picked"
                        variant="outline-danger"
                        @click="stornoReservation(idReservation)">
                Zrušit rezervaci
              </b-button>
            </template>
            <template v-if="!!$myStore.worker">
              <b-button v-if="!reservation.picked"
                        variant="outline-danger"
                        @click="stornoReservation(idReservation)">
                Zrušit rezervaci
              </b-button>
              <b-button variant="outline-primary"
                        v-if="!reservation.paid"
                        @click="payReservation(idReservation)">
                Zaplatit rezervaci
              </b-button>
              <b-button variant="outline-primary"
                        v-if="!reservation.picked"
                        @click="pickReservation(idReservation)">
                Vydat rezervaci
              </b-button>
              <b-button variant="outline-primary"
                        v-if="!reservation.picked && !reservation.paid"
                        @click="payAndPickReservation(idReservation)">
                Zaplatit a vydat rezervaci
              </b-button>
            </template>

          </b-list-group-item>
        </b-list-group>

        <b-alert v-else
          variant="danger"
          :show="true">
          Nemáte práva k této rezervaci.
        </b-alert>
      </template>

    </b-card>

  </div>
</template>

<script>
export default {
  name: 'SearchReservation',
  props: {
  },
  data: function () {
    return {
      idReservation: 0,
      reservation: undefined,
      failed: false
    }
  },
  computed: {
  },
  methods: {
    checkName (name) {
      return !!name
    },
    checkCapacity (capacity) {
      return capacity >= 0 && capacity !== undefined
    },

    getReservationById (id) {
      this.$myStore.backend.Reservations.getById(id)
        .then(res => {
          console.log('Reservation is:', res)
          this.reservation = res
        })
        .catch(e => {
          console.log('ERR:', e)
          this.reservation = undefined
        })
    },

    stornoReservation(id) {

      this.$myStore.backend.Reservations.remove(id)
        .then(res2 => {
          console.log('Prodana rezervace:', res2.data)
          this.getReservationById(id)
        })
        .catch(e => {
          console.log('Prodana rezervace KO:', e)
        })
    },
    payAndPickReservation(id) {

      this.$myStore.backend.Reservations.payAndPick(id)
        .then(res2 => {
          console.log('Prodana rezervace:', res2.data)
          this.getReservationById(id)
        })
        .catch(e => {
          console.log('Prodana rezervace KO:', e)
        })
    },
    payReservation(id) {

      this.$myStore.backend.Reservations.pay(id)
        .then(res2 => {
          console.log('Prodana rezervace:', res2.data)
          this.getReservationById(id)
        })
        .catch(e => {
          console.log('Prodana rezervace KO:', e)
        })
    },
    pickReservation(id) {

      this.$myStore.backend.Reservations.pick(id)
        .then(res2 => {
          console.log('Prodana rezervace:', res2.data)
          this.getReservationById(id)
        })
        .catch(e => {
          console.log('Prodana rezervace KO:', e)
        })
    }

  },
  mounted: function () {

  }
}
</script>

<style scoped lang="less">

</style>
