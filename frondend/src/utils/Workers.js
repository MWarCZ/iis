
import axios from 'axios'
import { BACKEND_URL, axiosConfig } from './constant.js'

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
    /*
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
      }) */
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
  getById (id) { /*
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
      }) */
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
    /*
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
      }) */
  },
  /* {
   *   id
   *   login
   *   firstname
   *   lastname
   *   idCinema
   * }
   */
  // {"id":"1","login":"test","name":"test","surname":"test","ssn":"tes@test.test","access":1}
  auth (login, password) {
    return axios.post(BACKEND_URL + '/employees.php',
      'request=LOGIN' + '&data=' +
      JSON.stringify({
        login: login,
        pass: password
      })
      , axiosConfig)
      .then(res => {
        console.log('LOGIN WORKER:', res.data)
        return res.data
      })

    /*
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
        return null
      }) */
  },
  getLogged () {
    return axios.post(BACKEND_URL + '/employees.php',
      'request=LOGGED'
      , axiosConfig)
      .then(res => {
        console.log('LOGGED WORKER:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data) {
          throw new Error(res.error)
        }
        return res.data
      })
      .then(res => {
        res.firstname = res.name
        res.lastname = res.surname
        return res
      })
  },
  logout () {
    return axios.post(BACKEND_URL + '/employees.php',
      'request=LOGOUT'
      , axiosConfig)
      .then(res => {
        console.log('LOGOUT WORKER:', res.data)
        return res.data
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
  create (firstname, lastname, login, password, idCinema, job, salary) {
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
