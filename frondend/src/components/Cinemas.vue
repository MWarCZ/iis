<template>
  <div>
    <b-card>
      <router-link class="link-as-text" :to="'/cinema/'+cinema.id"
        v-for="(cinema, index) in cinemas"
        :key="index">
        <b-card-group>
          <b-card>
            <img src="@/assets/logo.png" :alt="cinema.name"/>
          </b-card>
          <b-card :title="'<b>Název: </b>' + cinema.name">
            <b-list-group flush>

              <b-list-group-item>
                <b>Adresa:</b> {{cinema.address}}
              </b-list-group-item>

            </b-list-group>
          </b-card>
        </b-card-group>
      </router-link>

    </b-card>
  </div>

<!--
  <div class="cinemas-wrapper">
    <div class="cinemas-box">

      <router-link :to="'/cinema/'+cinema.id"
         class="cinemas-item"
         v-for="(cinema, index) in cinemas"
         :key="index"
         >

        <img class="cinemas-cinema-img" src="@/assets/logo.png" :alt="cinema.name"/>
        <div class="cinemas-cinema-info">
          <h3>Kino:</h3>
          {{cinema.name}}
          <h3>Adresa:</h3>
          {{cinema.address}}
        </div>

      </router-link>

    </div>
  </div>
-->
</template>

<script>
import axios from 'axios'
// import Cinema from '@/components/Cinema.vue'

export default {
  name: 'Cinemas',
  components: {
    // Cinema
  },
  props: {
  },
  data: function () {
    return {
      cinemas: []
    }
  },
  methods: {
    downloadCinemas: function () {
      let query = `{
        cinemas {
          id
          name
          address
        }
      }`
      axios.post('http://dev.mwarcz.cz', {
        query: query
      })
        .then(res => {
          console.log('Cinemas are downloading.')
          console.log(res.data.data.cinemas)
          this.cinemas = res.data.data.cinemas
        })
        .catch(e => {
          console.log('Cinemas are NOT downloaded.')
          console.log(e)
        })
    }
  },

  mounted: function () {
    this.downloadCinemas()
  }
}
</script>

<style scoped lang="less">
.link-as-text {
  color: #2c3e50;
  text-decoration: none;
}
.link-as-text:hover {
  color: #2c3e50;
  text-decoration: none;

  .card, .list-group-item {
    background-color: #eee;
  }
}
/*
.cinemas-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: black 1px solid;
}
h3 {
  display: inline;
}
h3:before {
  content: ' ';
  display: block;
}
*/
</style>
