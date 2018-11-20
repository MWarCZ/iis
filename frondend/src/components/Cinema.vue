<template>
  <div class="cinema-wrapper">
    <div v-if="cinema !== undefined">
      <h2>{{cinema.name}}</h2>
      <div class="cinema-item">
        <div class="cinema-info-box">
          <img class="cinema-img" src="@/assets/logo.png" :alt="cinema.name"/>

          <div class="cinema-info">
            <h3>Adresa:</h3>
            {{cinema.address}}
            <h3>Místnosti:</h3>
            <span
              class="cinema-room"
              v-for="(room, index) in cinema.rooms"
              :key="index"
              >
              {{room.name}}({{room.capacity}} míst)</span>
          </div>

        </div>

        <div class="cinema-projections">
          <h2>Projekce</h2>
          <Projections :idCinema="id" />
        </div>

      </div>

    </div>
    <div v-else>
      <h2>Kino Neexistuje!</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
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
    }

  }, // methots

  mounted: function () {
    this.downloadCinema()
  }
}
</script>

<style scoped lang="less">

.cinema-room:after {
  content: ', ';
  display: inline;
}
.cinema-room:last-child:after {
  content: ' '
}
.cinema-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.cinema-info-box {
  display: flex;
  align-items: center;
  text-align: left;
}

h3 {
  display: inline;
}
h3:before {
  content: ' ';
  display: block;
}

</style>
