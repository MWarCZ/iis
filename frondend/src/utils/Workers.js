
import axios from 'axios'
import BACKEND_URL from './constant.js'

const Workers = {
  /* [{
   *   id
   *   login
   *   firstname
   *   lastname
   *   job  // prodavac, vedouci
   *   salary
   *   idCinema
   *   cinema
   * }]
   */
  getAll () {
    let query = `{
      values: workers {
        id
        login
        firstname
        lastname
        job
        salary
        cinema {
          id
          name
        }
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
   *   job
   *   salary
   *   idCinema
   *   cinema
   * }
   */
  getById (id) {
    let query = `{
      values: worker(id: ${id}) {
        id
        login
        firstname
        lastname
        job
        salary
        cinema {
          id
          name
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
        return {
          ...res,
          cinema: res.cinema.name,
          idCinema: res.cinema.id
        }
      })
      .catch(e => {
        return {}
      })
  },
  /* [{
   *   id
   *   login
   *   firstname
   *   lastname
   *   job
   *   salary
   *   idCinema
   *   cinema
   * }]
   */
  getByIdCinema (id) {
    let query = `{
      values: cinemaWorker(idCinema: ${id}) {
        id
        login
        firstname
        lastname
        job
        salary
        cinema {
          id
          name
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
        return res.map(item => {
          return {
            ...item,
            cinema: res.cinema.name,
            idCinema: res.cinema.id
          }
        })
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
   *   idCinema
   * }
   */
  auth (login, password) {
    let query = `{
      values: workerLogin(login: "${login}", password: "${password}") {
        id
        login
        firstname
        lastname
        cinema {
          id
          name
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
        let newItem = {
          ...res,
          cinema: res.cinema.name,
          idCinema: res.cinema.id
        }
        return newItem
      })
      .catch(e => {
        return {}
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
  add (firstname, lastname, login, password, idCinema, job, salary) {
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
   *
   * }
   */
  update (id, firstname, lastname, login, password, idCinema, job, salary) {
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

export default Workers
