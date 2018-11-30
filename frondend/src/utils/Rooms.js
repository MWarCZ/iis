
import axios from 'axios'
import BACKEND_URL from './constant.js'

const Rooms = {
  /* [{
   *   id
   *   name
   *   capacity
   *   idCinema
   * }]
   */
  getAll () {
    let query = `{
      values: rooms {
        id
        name
        capacity
        cinema {
          id
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
        let values = res.map(value => {
          value.idCinema = value.cinema.id
          return value
        })
        return values
      })
      .catch(e => {
        return {}
      })
  },
  /* {
   *   id
   *   name
   *   capacity
   *   idCinema
   * }
   */
  getById (id) {
    let query = `{
      values: room(id: ${id}) {
        id
        name
        capacity
        cinema {
          id
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
        let values = res.map(value => {
          value.idCinema = value.cinema.id
          return value
        })
        return values
      })
      .catch(e => {
        return {}
      })
  },
  /* {
   *   id
   *   name
   *   capacity
   * }
   */
  getByIdCinema (id) {
    let query = `{
      values: cinemaRooms(idCinema: ${id}) {
        id
        name
        capacity
      }
    }`
    return axios.post(BACKEND_URL, {
      query: query
    })
      .then(res => {
        return res.data.data.values
      })
      .catch(e => {
        return {}
      })
  },

  /**/
  create (name, capacity, idCinema) {

  },
  /**/
  update (id, name, capacity) {

  },
  /**/
  remove (id) {

  },
  /**/
  add2Cinema (idRoom, idCinema) {

  }

}

export default Rooms
