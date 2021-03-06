
import axios from 'axios'
// import { BACKEND_URL } from './constant.js'
import { BACKEND_URL, axiosConfig } from './constant.js'

const Projections = {
  /* [{
   *   id
   *   datetime
   *   price
   *   idFilm
   *   film
   *   idCinema
   *   cinema
   *   idRoom
   *   room
   * }]
   */
  getAll () {
    // $date, $idFilm, $idHall, $idPrice, $idAccess
    return axios.post(BACKEND_URL + '/projections.php',
      'request=SELECT_ALL_WITH_DETAILS'
      , axiosConfig)
      .then(res => {
        console.log('ALL projections:', res.data)
        return res.data
      })
      .then(res => {
        let newRes = res.data.map(value => {
          value.id = Number(value.idProjection)
          value.idFilm = Number(value.idFilm)
          value.idRoom = Number(value.idHall)
          value.room = value.hall
          value.idCinema = Number(value.idCinema)
          value.datetime = value.date
          value.price = Number(value.price)
          return value
        })
        console.log('ALL projections2:', newRes)
        return newRes
      })
      /*
    let query = `{
      values: projections {
          id
          price
          datetime
          film {
            id
            name
          }
          room {
            id
            name
            cinema {
              id
              name
            }
          }
        }
    }`
    return axios.post(BACKEND_URL, {
      query: query
    })
      .then(res => {
        return res.data.data.values
      })
      .then(res => {
        return res.map((item) => {
          let newItem = {}
          newItem.id = item.id
          newItem.datetime = item.datetime
          newItem.price = item.price
          newItem.idFilm = item.film.id
          newItem.film = item.film.name
          newItem.idCinema = item.room.cinema.id
          newItem.cinema = item.room.cinema.name
          newItem.idRoom = item.room.id
          newItem.room = item.room.name

          return newItem
        })
      })
      .catch(e => {
        return {}
      }) */
  },
  /* {
   *   id
   *   datetime
   *   price
   *   idFilm
   *   film
   *   idCinema
   *   cinema
   *   idRoom
   *   room
   *   roomCapacity
   * }
   */
  getById (id) {
    return axios.post(BACKEND_URL + '/projections.php',
      'request=SELECT' + '&data=' +
      JSON.stringify({
        id: id
      })
      , axiosConfig)
      .then(res => {
        console.log('X id projection:', res.data)
        return res.data
      })
      .then(res => {
        let value = res.data
        value.id = Number(value.idProjection)
        value.idFilm = Number(value.idFilm)
        value.idRoom = Number(value.idHall)
        value.price = Number(value.price)
        value.datetime = value.date
        /*
        value.film = 'sss'
        value.cinema = ''

        newItem.film = item.film.name
        newItem.idCinema = item.room.cinema.id
        newItem.cinema = item.room.cinema.name
        newItem.idRoom = item.room.id
        newItem.room = item.room.name
        newItem.roomCapacity = item.room.capacity
        */

        return value
      })
      /*
    let query = `{
      values: projection(id: ${id}) {
          id
          price
          datetime
          film {
            id
            name
          }
          room {
            id
            name
            capacity
            cinema {
              id
              name
            }
          }
        }
    }`
    return axios.post(BACKEND_URL, {
      query: query
    })
      .then(res => {
        return res.data.data.values
      })
      .then(item => {
        let newItem = {}
        newItem.id = item.id
        newItem.datetime = item.datetime
        newItem.price = item.price
        newItem.idFilm = item.film.id
        newItem.film = item.film.name
        newItem.idCinema = item.room.cinema.id
        newItem.cinema = item.room.cinema.name
        newItem.idRoom = item.room.id
        newItem.room = item.room.name
        newItem.roomCapacity = item.room.capacity

        return newItem
      })

      .catch(e => {
        return {}
      }) */
  },

  /* [{
   *   TODO
   * }]
   */
  getByIdFilm () {
    /*
    let query = `{
      values: projections {
          id
          price
          datetime
          film {
            id
            name
          }
          room {
            id
            name
            cinema {
              id
              name
            }
          }
        }
    }`
    return axios.post(BACKEND_URL, {
      query: query
    })
      .then(res => {
        return res.data.data.values
      })
      .then(res => {
        return res.map((item) => {
          let newItem = {}
          newItem.id = item.id
          newItem.datetime = item.datetime
          newItem.price = item.price
          newItem.idFilm = item.film.id
          newItem.film = item.film.name
          newItem.idCinema = item.room.cinema.id
          newItem.cinema = item.room.cinema.name
          newItem.idRoom = item.room.id
          newItem.room = item.room.name

          return newItem
        })
      })
      .catch(e => {
        return {}
      })
      */
  },

  /**/
  // date, idFilm, idHall, price, idAccess
  create (datetime, price, idFilm, idRoom, idAccess = 1) {
    return axios.post(BACKEND_URL + '/projections.php',
      'request=INSERT' + '&data=' +
      JSON.stringify({
        date: datetime,
        price: price,
        idFilm: idFilm,
        idHall: idRoom,
        idAccess: idAccess
      })
      , axiosConfig)
      .then(res => {
        console.log('New projection id:', res.data)
        return res.data
      })
  },
  /**/
  update (id, datetime, price, idFilm, idRoom) {

  },
  /**/
  remove (id) {
    return axios.post(BACKEND_URL + '/projections.php',
      'request=DELETE' + '&data=' +
      JSON.stringify({
        id: id
      })
      , axiosConfig)
      .then(res => {
        console.log('Delete projection bool:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data) {
          throw new Error(res.error)
        }
        return res
      })
  }

}

export default Projections
