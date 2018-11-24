
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
        return {}
      })
  }

}

export default Clients
