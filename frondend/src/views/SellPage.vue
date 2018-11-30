<template>
  <div>
    <h1>Všechny rezervace</h1>
    <Reservations />
  </div>
</template>

<script>
import Reservations from '@/components/Reservations.vue'

export default {
  name: 'SellPage',
  components: {
    Reservations
  }
}
</script>
