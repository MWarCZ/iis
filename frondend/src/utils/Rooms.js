
import axios from 'axios'
import { BACKEND_URL, axiosConfig } from './constant.js'

const Rooms = {
  /* [{
   *   id
   *   name
   *   capacity
   *   idCinema
   * }]
   */
  getAll () {
    return axios.post(BACKEND_URL + '/halls.php',
      'request=SELECT_ALL'
      , axiosConfig)
      .then(res => {
        console.log('ALL Halls:', res.data)
        return res.data
      })
      .then(res => {
        if (res.data) {
          let newRes = res.data.map(value => {
            value.id = Number(value.idHall)
            value.name = value.cinemaMark
            value.capacity = Number(value.capacity)
            value.idCinema = Number(value.idCinema)
            return value
          })
          console.log('ALL Halls2:', newRes)
          return newRes
        } else {
          return []
        }
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
    return axios.post(BACKEND_URL + '/halls.php',
      'request=SELECT' + '&data=' +
      JSON.stringify({
        id: id
      })
      , axiosConfig)
      .then(res => {
        console.log('Id Hall:', res.data)
        return res.data
      })
      .then(res => {
        let value = res.data
        value.id = Number(value.idHall)
        value.name = value.cinemaMark
        value.capacity = Number(value.capacity)
        value.idCinema = Number(value.idCinema)

        console.log('Id Hall2:', value)
        return value
      })
  },
  /* {
   *   id
   *   name
   *   capacity
   * }
   */
  getByIdCinema (id) {
    return this.getAll()
      .then(res => {
        console.log('idall', res)
        res = res.filter(room => room.idCinema === id)
        return res
      })
  },

  /**/
  create (name, capacity, idCinema) {
    return axios.post(BACKEND_URL + '/halls.php',
      'request=INSERT' + '&data=' +
      JSON.stringify({
        mark: name,
        cap: capacity,
        idCinema: idCinema
      })
      , axiosConfig)
      .then(res => {
        console.log('New Hall id:', res.data)
        return res.data
      })
  },
  /**/
  update (id, name, capacity) {

  },
  /**/
  remove (id) {
    return axios.post(BACKEND_URL + '/halls.php',
      'request=DELETE' + '&data=' +
      JSON.stringify({
        id: id
      })
      , axiosConfig)
      .then(res => {
        console.log('Delete hall bool:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data) {
          throw new Error(res.error)
        }
        return res
      })
  },
  /**/
  add2Cinema (idRoom, idCinema) {

  }

}

export default Rooms
