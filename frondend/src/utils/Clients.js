
import axios from 'axios'
import BACKEND_URL from './constant.js'

const Clients = {
  /* [{
   *   id
   *   login
   * }]
   */
  getAll () {
    let query = `{
      values: clients {
        id
        login
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
   *   login
   *   firstname
   *   lastname
   * }
   */
  getById (id) {
    let query = `{
      values: client(id: ${id}) {
        id
        login
        firstname
        lastname
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
   *   login
   *   firstname
   *   lastname
   * }
   */
  auth (login, password) {
    let query = `{
      values: clientLogin(login: "${login}", password: "${password}") {
        id
        login
        firstname
        lastname
      }
    }`
    return axios.post(BACKEND_URL, {
      query: query
    })
      .then(res => {
        return res.data.data.values
      })
      .catch(e => {
        return null
      })
  },

  /// ////// ///
  //  CREATE  //
  /// ////// ///

  /* {
   *   id
   *   login
   *   firstname
   *   lastname
   * }
   */
  add (firstname, lastname, login, password) {
    // TODO
    return axios.post(BACKEND_URL, {
    })
      .then(res => {
        return res.data.data.values
      })
      .catch(e => {
        return {}
      })
  },

  /// ////// ///
  //  UPDATE  //
  /// ////// ///

  /* {
   *   id
   *   login
   *   firstname
   *   lastname
   * }
   */
  update (id, firstname, lastname, login) {
    // TODO
    return axios.post(BACKEND_URL, {
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
   *   login
   *   firstname
   *   lastname
   * }
   */
  updatePassword (id, newPassword, oldPassword) {
    // TODO
    return axios.post(BACKEND_URL, {
    })
      .then(res => {
        return res.data.data.values
      })
      .catch(e => {
        return {}
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

export default Clients
