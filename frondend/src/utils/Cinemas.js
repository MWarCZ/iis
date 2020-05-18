
import axios from 'axios'
import { BACKEND_URL, axiosConfig } from './constant.js'

const Cinemas = {
  /* [{
   *   id
   *   name
   *   address
   * }]
   */
  // "data":array("id":"xx","name":"xx","addres":"xx")
  getAll () {
    return axios.post(BACKEND_URL + '/cinemas.php',
      'request=SELECT_ALL'
      , axiosConfig)
      .then(res => {
        console.log('ALL Cinemas:', res.data)
        return res.data
      })
      .then(res => {
        let newRes = res.data.map(value => {
          value.id = Number(value.idCinema)
          return value
        })
        return newRes
      })
  },
  /* {
   *   id
   *   name
   *   address
   * }
   */
  // "data":"id":"xx","name":"xx","addres":"xx"
  getById (id) {
    return axios.post(BACKEND_URL + '/cinemas.php',
      'request=SELECT' + '&data=' +
      JSON.stringify({
        id: id
      })
      , axiosConfig)
      .then(res => {
        console.log('Id Cinemas:', res.data)
        return res.data
      })
      .then(res => {
        res.data.id = Number(res.data.idCinema)
        return res.data
      })
  },

  /// /////// ///
  //  ADD NEW  //
  /// /////// ///

  /* OK:
   * {
   *   id
   *   name
   *   address
   * }
   *
   * KO:
   *   null | false
   */
  create (name, address, imgUrl) {
    return axios.post(BACKEND_URL + '/cinemas.php',
      'request=INSERT' + '&data=' +
      JSON.stringify({
        name: name,
        address: address
      })
      , axiosConfig)
      .then(res => {
        console.log('New Cinema id:', res.data)
        return res.data
      })
  },

  /// ////// ///
  //  UPDATE  //
  /// ////// ///

  // return true | null
  update (id, name, address, imgUrl) {
    return axios.post(BACKEND_URL + '/cinemas.php',
      'request=UPDATE' + '&data=' +
      JSON.stringify({
        id: id,
        name: name,
        address: address
      })
      , axiosConfig)
      .then(res => {
        console.log('Update Cinema bool:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data) {
          throw new Error(res.error)
        }
        return res
      })
  },

  /// ////// ///
  //  REMOVE  //
  /// ////// ///

  // return true | null
  remove (id) {
    // TODO
    return axios.post(BACKEND_URL + '/cinemas.php',
      'request=DELETE' + '&data=' +
      JSON.stringify({
        id: id
      })
      , axiosConfig)
      .then(res => {
        console.log('Delete Cinema bool:', res.data)
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

export default Cinemas
