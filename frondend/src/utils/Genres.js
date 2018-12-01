
import axios from 'axios'
import { BACKEND_URL, axiosConfig } from './constant.js'

const Genres = {
  /* [{
   *   id
   *   name
   * }]
   */
  getAll () {
    return axios.post(BACKEND_URL + '/genres.php',
      'request=SELECT_ALL'
      , axiosConfig)
      .then(res => {
        console.log('ALL gneres:', res.data)
        return res.data
      })
      .then(res => {
        let newRes = res.data.map(value => {
          value.id = Number(value.idGenre)
          return value
        })
        return newRes
      })
  },

  /* {
   *   id
   *   name
   * }
   */
  getById (id) {
    return axios.post(BACKEND_URL + '/genres.php',
      'request=SELECT' + '&data=' +
      JSON.stringify({
        id: id
      })
      , axiosConfig)
      .then(res => {
        console.log('Id gneres:', res.data)
        return res.data
      })
      .then(res => {
        res.data.id = res.data.idGenre
        return res.data
      })
  },

  /// //////// ///
  //  ADD NEW   //
  /// //////// ///

  /* OK:
   * {
   *   id
   *   name
   * }
   *
   * KO:
   *   null | false
   */
  create (name) {
    // TODO
    return axios.post(BACKEND_URL, {
    })
      .then(res => {
        return res.data
      })
      .catch(e => {
        return undefined
      })
  },

  /// ////// ///
  //  UPDATE  //
  /// ////// ///

  /* OK:
   * {
   *   id
   *   name
   * }
   *
   * KO:
   *   null | false
   */
  update (id, name) {
    // TODO
    return axios.post(BACKEND_URL, {
    })
      .then(res => {
        return res.data
      })
      .catch(e => {
        return undefined
      })
  },

  /// ////// ///
  //  REMOVE  //
  /// ////// ///

  /* OK:
   *   true
   *
   * KO:
   *   null | false
   */
  remove (id) {
    // TODO
    return axios.post(BACKEND_URL, {
    })
      .then(res => {
        return res.data
      })
      .catch(e => {
        return undefined
      })
  }

}

export default Genres
