<template>
  <div>
    <button @click="$router.go(-1)">Zpět</button>
    <b-card v-if="!!$myStore.worker && $myStore.worker.access >= 3">
      <h1>Správa zaměstnanců</h1>

      <b-button variant="outline-primary"
        @click="showDialogAddWorker = true">
        Přidat zaměstnance
      </b-button>
      <Dialog v-if="showDialogAddWorker"
        @close="showDialogAddWorker = false">
        <b-card>
          <h2>Nový zaměstnance</h2>
          <WorkerCreate
            @success="getWorkers(); showDialogAddWorker = false" />
        </b-card>
      </Dialog>

      <h2>Seznam zaměstnanců</h2>
      <WorkersList :workers="workers"
            @success="getWorkers();" />
    </b-card>
    <b-card v-else>
      <h1>Nemáte dostatečná opravnění.</h1>
    </b-card>
  </div>
</template>

<script>

import WorkerCreate from '@/components/WorkerCreate.vue'
import WorkersList from '@/components/WorkersList.vue'
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'WorkersPage',
  components: {
    WorkerCreate,
    WorkersList,
    Dialog
  },
  data: function () {
    return {
      workers: () => [],
      showDialogAddWorker: false
    }
  },
  methods: {
    getWorkers () {
      this.$myStore.backend.Workers.getAll()
        .then(res => {
          console.log('Workers are:', res)
          if (res[0] === undefined) {
            throw new Error({ msg: 'Empty Workers.', res })
          }
          this.workers = res
        })
        .catch(e => {
          console.log('ERR:', e)
          this.workers = []
        })
    }
  },
  mounted () {
    this.getWorkers ()
  },
}
</script>
