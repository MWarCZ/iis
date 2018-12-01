
import axios from 'axios'
import { BACKEND_URL, axiosConfig } from './constant.js'

const Clients = {
  /* [{
   *   id
   *   login
   * }]
   */
  getAll () {
    /*
    let query = `{
      values: clients {
        id
        login
      }
    }`
    return axios.post(BACKEND_URL + '/users.php', {
      request: 'INSERT',
      data: {
        'login': 'test1',
        'name': 'test1',
        'surname': 'test1',
        'email': 'test1@test.cz',
        'pass': 'test1',
        'pass_verifi': 'test1'
      }
    }, axiosConfig)
      .then(res => {
        return res.data.data.values
      })
      .catch(e => {
        return {}
      })
      */
  },
  /* {
   *   id
   *   login
   *   firstname
   *   lastname
   * }
   */
  getById (id) {
    /*
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
      */
  },
  /* {
   *   id
   *   login
   *   firstname
   *   lastname
   * }
   */
  // true/null
  auth (login, password) {
    return axios.post(BACKEND_URL + '/users.php',
      'request=LOGIN' + '&data=' +
      JSON.stringify({
        login: login,
        pass: password
      })
      , axiosConfig)
      .then(res => {
        console.log('LOGIN CLIENT:', res.data)
        return res.data
      })
  },
  // {"id":"1","login":"test","name":"test","surname":"test","email":"tes@test.test","access":1}}
  getLogged () {
    return axios.post(BACKEND_URL + '/users.php',
      'request=LOGGED'
      , axiosConfig)
      .then(res => {
        console.log('LOGGED CLIENT:', res.data)
        return res.data
      })
      .then(res => {
        if(!res.data) {
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
    return axios.post(BACKEND_URL + '/users.php',
      'request=LOGOUT'
      , axiosConfig)
      .then(res => {
        console.log('LOGOUT CLIENT:', res.data)
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
   *   birthday
   * }
   */
  create (firstname, lastname, login, password, password2, email, birthday) {
    // TODO
    return axios.post(BACKEND_URL + '/users.php',
      'request=INSERT' + '&data=' +
      JSON.stringify({
        login: login,
        name: firstname,
        surname: lastname,
        email: email,
        pass: password,
        pass_verifi: password
      })
      , axiosConfig)
      .then(res => {
        return res.data
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
   *   birthday
   * }
   */
  update (id, firstname, lastname, login, birthday) {
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
