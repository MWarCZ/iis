
import axios from 'axios'
import { BACKEND_URL, axiosConfig } from './constant.js'

const Directors = {
  /* [{
   *   id
   *   firstname
   *   lastname
   * }]
   */
  getAll () {
    return axios.post(BACKEND_URL + '/directors.php',
      'request=SELECT_ALL'
      , axiosConfig)
      .then(res => {
        console.log('ALL directors:', res.data)
        return res.data
      })
      .then(res => {
        let newRes = res.data.map(value => {
          value.id = Number(value.idDirector)
          value.firstname = value.name
          value.lastname = value.surname
          return value
        })
        console.log('-------------', newRes)
        return newRes
      })
  },
  /* {
   *   id
   *   firstname
   *   lastname
   * }
   */
  getById (id) {
    return axios.post(BACKEND_URL + '/directors.php',
      'request=SELECT' + '&data=' +
      JSON.stringify({
        id: id
      })
      , axiosConfig)
      .then(res => {
        console.log('Id directors:', res.data)
        return res.data
      })
      .then(res => {
        let value = res.data
        value.id = Number(value.idDirector)
        value.firstname = value.name
        value.lastname = value.surname
        return value
      })
  },

  /**/
  create (name, premiere, idDirector, idStudio) {

  },
  /**/
  update (id, name, premiere, idDirector, idStudio) {

  },
  /**/
  remove (id) {

  },
  /**/
  add2Film (idDirector, idFilm) {

  }

}

export default Directors
