
import axios from 'axios'
import { BACKEND_URL, axiosConfig } from './constant.js'

const Actors = {
  /* [{
   *   id
   *   firstname
   *   lastname
   *   lastname
   *   birthday
   *   films [idFilm, ...]
   * }]
   */
  getAll () {
    return axios.post(BACKEND_URL + '/actors.php',
      'request=SELECT_ALL'
      , axiosConfig)
      .then(res => {
        console.log('ALL Actors:', res.data)
        return res.data
      })
      .then(res => {
        let newRes = res.data.map(value => {
          value.id = Number(value.idActor)
          value.firstname = value.name
          value.lastname = value.surname
          return value
        })
        return newRes
      })
  },
  /* {
   *   id
   *   firstname
   *   lastname
   *   lastname
   *   birthday
   *   films :[idFilm, ...]
   * }
   */
  getById (id) {
    return axios.post(BACKEND_URL + '/actors.php',
      'request=SELECT' + '&data=' +
      JSON.stringify({
        id: id
      })
      , axiosConfig)
      .then(res => {
        console.log('Id actors:', res.data)
        return res.data
      })
      .then(res => {
        let value = res.data
        value.id = Number(value.idActor)
        value.firstname = value.name
        value.lastname = value.surname
        return value
      })
  },
  /* OK:
   * {
   *   id
   *   firstname
   *   lastname
   *   lastname
   *   birthday
   * }
   * KO: null
   */
  create (firstname, lastname, birthday) {
    // TODO
    let query = `{
      values: actor(id:1) {
        id
        firstname
        lastname
        birthday
        films {
          id
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
        let values = res
        let films = res.films.map(value => {
          return value.id
        })
        values.films = films
        return values
      })
      .catch(e => {
        return {}
      })
  },

  update (id, firstname, lastname, birthday) {
    // TODO
    let query = `{
      values: actor(id:${id}) {
        id
        firstname
        lastname
        birthday
        films {
          id
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
        let values = res
        let films = res.films.map(value => {
          return value.id
        })
        values.films = films
        return values
      })
      .catch(e => {
        return {}
      })
  },

  /*
   */
  remove (id) {
    // TODO
    let query = `{
      values: actor(id:${id}) {
        id
        firstname
        lastname
        birthday
        films {
          id
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
        let values = res
        let films = res.films.map(value => {
          return value.id
        })
        values.films = films
        return values
      })
      .catch(e => {
        return {}
      })
  },
  /*

   */
  add2Film (idActor, idFilm) {

  }

}

export default Actors
