
import axios from 'axios'
import BACKEND_URL from './constant.js'

/*
  projections.map((item) => {
        let res = {}
        res.id = item.id
        res.datetime = new Date(item.datetime)
        res.date = DateTime.date2string(res.datetime, 'input')
        res.time = DateTime.time2string(res.datetime)
        res.film = item.type.film.name
        res.idFilm = item.type.film.id
        res.cinema = item.room.cinema.name
        res.idCinema = item.room.cinema.id
        res.room = item.room.name
        res.price = item.price

        return res
      })
*/

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
    let query = `{
      values: projections {
          id
          price
          datetime
          type {
            film {
              id
              name
            }
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
          newItem.idFilm = item.type.film.id
          newItem.film = item.type.film.name
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
   * }
   */
  getById (id) {
    let query = `{
      values: projection(id: ${id}) {
          id
          price
          datetime
          type {
            film {
              id
              name
            }
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
      .then(item => {
        let newItem = {}
        newItem.id = item.id
        newItem.datetime = item.datetime
        newItem.price = item.price
        newItem.idFilm = item.type.film.id
        newItem.film = item.type.film.name
        newItem.idCinema = item.room.cinema.id
        newItem.cinema = item.room.cinema.name
        newItem.idRoom = item.room.id
        newItem.room = item.room.name

        return newItem
      })

      .catch(e => {
        return {}
      })
  },

  /* [{
   *   TODO
   * }]
   */
  getByIdFilm () {
    let query = `{
      values: projections {
          id
          price
          datetime
          type {
            film {
              id
              name
            }
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
          newItem.idFilm = item.type.film.id
          newItem.film = item.type.film.name
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
  }

}

export default Projections
