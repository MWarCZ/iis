
import axios from 'axios'
import { BACKEND_URL, axiosConfig } from './constant.js'

const Studios = {
  /* [{
   *   id
   *   name
   * }]
   */
  getAll () {
    return axios.post(BACKEND_URL + '/studios.php',
      'request=SELECT_ALL'
      , axiosConfig)
      .then(res => {
        console.log('ALL studios:', res.data)
        return res.data
      })
      .then(res => {
        let newRes = res.data.map(value => {
          value.id = Number(value.idStudio)
          return value
        })
        console.log('-------------', newRes)
        return newRes
      })
  },
  /* {
   *   id
   *   name
   * }
   */
  getById (id) {
    return axios.post(BACKEND_URL + '/studios.php',
      'request=SELECT' + '&data=' +
      JSON.stringify({
        id: id
      })
      , axiosConfig)
      .then(res => {
        console.log('Id studio:', res.data)
        return res.data
      })
      .then(res => {
        let value = res.data
        value.id = Number(value.idStudio)
        return value
      })
  },

  /**/
  create (name) {

  },
  /**/
  update (id, name) {

  },
  /**/
  remove (id) {

  },
  /**/
  add2Film (idStudio, idFilm) {

  }

}

export default Studios
