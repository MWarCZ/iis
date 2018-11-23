<template>
  <Dialog v-if="showDialog" @close="$emit('close')">
    <b-card>
      <Reservation
        @fail="$emit('fail');$emit('close')"
        @success="$emit('success');$emit('close')" />
    </b-card>
  </Dialog>
</template>

<script>
import axios from 'axios'
import Dialog from '@/components/Dialog.vue'
import Reservation from '@/components/Reservation.vue'

export default {
  name: 'ReservationDialog',
  components: {
    Reservation,
    Dialog
  },
  data: function () {
    return {
    }
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
  }, // methots

  mounted: function () {
  }
}
</script>

<style scoped lang="less">

.seat {
  &.selected {
    background-color: #3a50d1;
  }
}

</style>
