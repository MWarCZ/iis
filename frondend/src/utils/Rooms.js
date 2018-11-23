
import axios from 'axios'
import BACKEND_URL from './constant.js'

const Rooms = {
  /* [{
   *   id
   *   name
   *   capacity
   * }]
   */
  getAll () {
    let query = `{
      values: rooms {
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
  /* {
   *   id
   *   name
   *   capacity
   * }
   */
  getById (id) {
    let query = `{
      values: room(id: ${id}) {
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
  }

}

export default Rooms
