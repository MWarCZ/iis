<template>
  <div>
    <b-table striped hover
      :fields="fields"
      :items="providerWorkers(workers)"
      sort-by="date">

      <template slot="show_details" slot-scope="row">
        <b-button @click="row.toggleDetails()">
          {{ !row.detailsShowing ? 'Zobrazit' : 'Skrýt'}}
        </b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card>
          <Worker :worker="row.item" />

          <b-input-group prepend="Změnit acces lvl:">
            <b-form-select v-model="newAcces"
                    v-if="!!$myStore.worker && $myStore.worker.access >= 4"
                           >
              <option value="2"> Prodavač</option>
              <option value="3"> Manager</option>
              <option value="4"> Admin</option>
            </b-form-select>
            <b-button variant="outline-primary"
                    v-if="!!$myStore.worker && $myStore.worker.access >= 4"
                    @click="changeAccess(row.item.login, newAcces)"
                    >
                    Změnit
            </b-button>
            <b-button variant="outline-secondary"
                      v-else
                      disabled
                    >
                    Požadejte o změnu někoho s vyšími pravy.
            </b-button>
          </b-input-group>
        </b-card>
      </template>
  <!--
      <template slot="event" slot-scope="data">
        <b-button v-if="!!$myStore.worker && $myStore.worker.access >= 3"
          variant="outline-danger"
          @click="$emit('deleteRoom', { idRoom: data.item.id })">
          Smazat
        </b-button>
        <span v-else>
          Nemas prava mazat místnost.
        </span>
      </template>
       -->
    </b-table>
    <Dialog v-if="showDialog"
            @close="showDialog = false"
            >
            <Worker :editable="true"
                    :worker="editedWorker"
                    @changeWorker="$emit('changeWorker', arguments[0])"
                    @exit="showDialog = false"
                    />
    </Dialog>

    <ErrorDialog
      :showDialog="failed"
      @close="failed = false"
      message="Akce nebyla odmítnuta."
      />
  </div>
</template>

<script>
import Worker from '@/components/Worker.vue'
import Dialog from '@/components/Dialog.vue'
import ErrorDialog from '@/components/ErrorDialog.vue'

export default {
  name: 'WorkersList',
  components: {
    Worker,
    Dialog,
    ErrorDialog
  },
  props: {
    workers: {
      type: [Array, Function],
      default: () => []
    }

    /* worker:
        id
        firstname
        lastname
        access
        login
        ssn
        deleted
     */
  },
  data: function () {
    return {
      editedWorker: {},
      newAcces: 2,
      showDialog: false,
      failed: false,
      fields: [
        { key: 'access', label: 'Access lvl', sortable: true },
        { key: 'login', label: 'Login', sortable: true },
        { key: 'firstname', label: 'Jméno', sortable: true },
        { key: 'lastname', label: 'Příjmení', sortable: true },
        { key: 'show_details', label: 'Zobrazit' },
      ]
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
    providerWorkers (workers) {
      let workers1 = workers
      console.log('WorkerList-providerWorkers:', workers1)
      return workers1
    },
    changeAccess (login, access) {
      console.log('AAAAAAAA', this.$myStore.backend.Workers.updateAccess)
      this.$myStore.backend.Workers.updateAccess(login, access)
        .then(res => {
          console.log('access is:', res)
          let worker = this.workers.find(w => w.login === login)
          worker.access = access
          // this.nowRooms = res
        })
        .catch(e => {
          console.log('ERR:', e)
          this.failed = true
        })
    },
  },
  mounted: function () {
    /*
    if (this.idCinema !== undefined) {
      // Ziskani mistnosti kina
      this.$myStore.backend.Rooms.getByIdCinema(this.idCinema)
        .then(res => {
          console.log('Rooms are:', res)
          if (res[0] === undefined) {
            throw new Error({ msg: 'Empty Rooms', res })
          }
          this.nowRooms = res
        })
        .catch(e => {
          console.log('ERR:', e)
        })
    } */
  }
}
</script>

<style scoped lang="less">

</style>
