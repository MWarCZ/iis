<template>
  <div>
    <div v-if="cinema !== undefined">
      <h2>{{cinema.name}}</h2>

      <b-card>

        <b-card-group>
          <b-card>
            <img src="@/assets/logo.png" :alt="cinema.name"/>
          </b-card>
          <b-card :title="'<b>Název: </b>' + cinema.name">
            <b-list-group flush>

              <b-list-group-item>
                <b>Adresa:</b> {{cinema.address}}
              </b-list-group-item>

              <b-list-group-item>
                <b>Místnosti:</b>
                <span class="comma-line"
                  v-for="(room, index) in cinema.rooms"
                  :key="index">
                  {{room.name}}({{room.capacity}} míst)
                </span>
              </b-list-group-item>

            </b-list-group>
          </b-card>
        </b-card-group>

        <b-card>
          <h2>Projekce</h2>
          <Projections :idCinema="id" />
        </b-card>

      </b-card>
    </div>
    <div v-else>
      <h2>Kino Neexistuje.</h2>
    </div>
  </div>

</template>

<script>
// import axios from 'axios'
import Projections from '@/components/Projections.vue'

export default {
  name: 'Cinema',
  components: {
    Projections
  },
  data: function () {
    return {
      cinema: undefined
    }
  },
  props: {
    id: {
      type: Number,
      default: undefined
    }
  },
  methods: {
    /*
    downloadCinema: function () {
      let query = `{
        cinema(id: ${this.id}) {
          id
          name
          address
          rooms {
            id
            name
            capacity
          }
        }
      }`

      console.log('GraphQL query:', query)

      axios.post('http://dev.mwarcz.cz', {
        query: query
      })
        .then(res => {
          console.log('Cinema is downloading.')
          this.cinema = res.data.data.cinema
        })
        .catch(e => {
          console.log('Cinema is NOT downloaded.')
          console.log(e)
        })
    } */

  }, // methots

  mounted: function () {
    // this.downloadCinema()

    // Stazeni kin
    this.$myStore.backend.Cinemas.getById(this.id)
      .then(res => {
        console.log('Cinema is:', res)
        return this.$myStore.backend.Rooms.getByIdCinema(this.id)
          .then(res2 => {
            res.rooms = res2
            console.log('Rooms are:', res)
            return res
          })
          .catch(e => {
            return undefined
          })
      })
      .then(res => {
        console.log('Cinema with Rooms is:', res)
        if (res.id === undefined) {
          throw new Error({ msg: 'Empty Cinema.', res })
        }
        this.cinema = res
      })
      .catch(e => {
        console.log('ERR:', e)
        this.cinema = undefined
      })
  }
}
</script>

<style scoped lang="less">

.comma-line:after {
  content: ', ';
  display: inline;
}
.comma-line:last-child:after {
  content: ' '
}

</style>
