
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
    return axios.post(BACKEND_URL + '/employees.php',
      'request=SELECT_ALL'
      , axiosConfig)
      .then(res => {
        console.log('ALL workers:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data) {
          throw new Error(res.error)
        }
        return res.data
      })
      .then(res => {
        let newValue = res.map(value => {
          value.id = Number(value.idEmployee)
          value.deleted = Number(value.deleted)
          value.firstname = value.name
          value.lastname = value.surname
          value.access = Number(value.access_level)
          return value
        })
        /*
        id
        firstname
        lastname
        access
        login
        ssn
        deleted
         */
        console.log('ALL workers2:', newValue)
        return newValue
      })
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
  create (firstname, lastname, login, password, password2, ssn, idCinema, access) {
    // TODO
    console.log('ssn:', ssn)
    return axios.post(BACKEND_URL + '/employees.php',
      'request=INSERT' + '&data=' +
      JSON.stringify({
        login: login,
        name: firstname,
        surname: lastname,
        ssn: ssn,
        pass: password,
        pass_verifi: password2,
        idCinema: idCinema,
        acces: access
      })
      , axiosConfig)
      .then(res => {
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

  updateAccess (login, access) {
    // TODO
    return axios.post(BACKEND_URL + '/employees.php',
      'request=CHANGE_ACCESS' + '&data=' +
      JSON.stringify({
        login: login,
        acces: Number(access)
      })
      , axiosConfig)
      .then(res => {
        console.log('Acces update:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data) {
          throw new Error(res.error)
        }
        return res
      })
  },
  updatePassword (login, newPassword, newPassword2, oldPassword) {
    // TODO
    return axios.post(BACKEND_URL + '/employees.php',
      'request=CHANGE_PASSW' + '&data=' +
      JSON.stringify({
        login: login,
        old_pass: oldPassword,
        new_pass: newPassword,
        new_verifi: newPassword2
      })
      , axiosConfig)
      .then(res => {
        console.log('Change password Worker:', res.data)
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

  /* OK:
   *   true
   *
   * KO:
   *   null | false
   */
  remove (login) {
    // TODO
    return axios.post(BACKEND_URL + '/employees.php',
      'request=DELETE' + '&data=' +
      JSON.stringify({
        login: login
      })
      , axiosConfig)
      .then(res => {
        console.log('Delete worker bool:', res.data)
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

export default Workers
