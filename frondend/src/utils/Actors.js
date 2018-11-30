
import axios from 'axios'
import BACKEND_URL from './constant.js'

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
    let query = `{
      values: actors {
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
        let values = res.map(value => {
          value.films = value.films.map(film => {
            return film.id
          })
          return value
        })
        console.log('ACTORS:', values)
        return values
      })
      .catch(e => {
        return {}
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
