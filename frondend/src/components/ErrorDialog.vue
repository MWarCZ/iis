<template>
  <Dialog v-if="showDialog" @close="$emit('close')">
    <b-card style="overflow:auto">
      <b-alert v-if="hasDefaultSlot" variant="danger" show>
        <slot></slot>
      </b-alert>
      <b-alert v-else variant="danger" show>
        <h4 class="alert-heading">{{title}}</h4>
        <p>
          {{message}}
        </p>
      </b-alert>
      <b-button @click="$emit('close')" variant="primary">OK</b-button>
    </b-card>
  </Dialog>
</template>

<script>
// import axios from 'axios'
import Dialog from '@/components/Dialog.vue'
import Reservation from '@/components/Reservation.vue'

export default {
  name: 'ErrorDialog',
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
    },
    title: {
      type: String,
      default: 'Error!'
    },
    message: {
      type: String,
      default: ''
    }
  },
  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    },
    hasFooterSlot () {
      return !!this.$slots['footer']
    },
    hasSlot (name = 'default') {
      return !!this.$slots[ name ] || !!this.$scopedSlots[ name ]
    }
  },
  methods: {
  }, // methots

  mounted: function () {
  }
}
</script>

<style scoped lang="less">

</style>
