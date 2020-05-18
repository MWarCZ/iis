
import axios from 'axios'
import { BACKEND_URL, axiosConfig } from './constant.js'

const Films = {
  /* [{
   *   id
   *   name
   *   premiere
   *   genres [{
   *     id
   *     name
   *   }]
   * }]
   */
  getAll () {
    return axios.post(BACKEND_URL + '/films.php',
      'request=SELECT_ALL'
      , axiosConfig)
      .then(res => {
        console.log('ALL films:', res.data)
        return res.data
      })
      .then(res => {
        let newRes = res.data.map(value => {
          value.id = Number(value.idFilm)
          value.premiere = value.released
          value.genres = value.genres.map(genre => {
            genre.id = Number(genre.idGenre)
            return genre
          })
          // console.log('ALL films genres:', value.genres)
          return value
        })
        return newRes
      })
    /*
    let query = `{
      values: films {
        id
        name
        premiere
        genres {
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
   *   name
   *   premiere
   *   genres [{
   *     id
   *     name
   *   }]
   *   director {
   *     id
   *     firstname
   *     lastname
   *   }
   *   studio {
   *     id
   *     name
   *   }
   *   actors [{
   *     id
   *     firstname
   *     lastname
   *   }]
   * }
   */
  getById (id) {
    /*
    let query = `{
      values: film(id: ${id}) {
        id
        name
        premiere
        genres {
          id
          name
        }
        director {
          id
          firstname
          lastname
        }
        studio {
          id
          name
        }
        actors {
          id
          firstname
          lastname
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
        let value = res
        value.idDirector = res.director.id
        value.firstnameDirector = res.director.firstname
        value.lastnameDirector = res.director.lastname
        value.idStudio = res.studio.id
        value.studio = res.studio.name
        return value
      })
      .catch(e => {
        return {}
      }) */
    return axios.post(BACKEND_URL + '/films.php',
      'request=SELECT' + '&data=' +
      JSON.stringify({
        id: id
      })
      , axiosConfig)
      .then(res => {
        console.log('id film:', res.data)
        return res.data
      })
      .then(res => {
        let value = res.data[0]
        value.id = Number(value.idFilm)
        value.premiere = value.released

        if (value.director) {
          value.idDirector = Number(value.director.idDirector)
          value.firstnameDirector = value.director.name
          value.lastnameDirector = value.director.surname
        }
        if (value.studio) {
          value.idStudio = Number(value.studio.idStudio)
          value.studio = value.studio.name
        }
        value.genres = value.genres.map(genre => {
          genre.id = Number(genre.idGenre)
          return genre
        })
        value.actors = value.actors.map(actor => {
          actor.id = Number(actor.idActor)
          actor.firstname = actor.name
          actor.lastname = actor.surname
          return actor
        })
        console.log('id film:', value)
        return value
      })
  },

  /**/
  create (name, premiere, duration, idDirector, idStudio, idsGenre = []) {
    console.log('Films All input:', name, ' | ', premiere, ' | ', duration, ' | ', idDirector, ' | ', idStudio, ' | ', idsGenre)
    return axios.post(BACKEND_URL + '/films.php',
      'request=INSERT' + '&data=' +
      JSON.stringify({
        name: name,
        released: premiere,
        duration: duration,
        idDirector: idDirector,
        idStudio: idStudio,
        genres: idsGenre,
        rating: 0

      })
      , axiosConfig)
      .then(res => {
        console.log('New film id:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data) {
          throw new Error(res.error)
        }
        return res
      })
  },
  /**/
  update (id, name, premiere, duration, idDirector, idStudio, idsGenre = []) {
    return axios.post(BACKEND_URL + '/films.php',
      'request=UPDATE' + '&data=' +
      JSON.stringify({
        id: id,
        name: name,
        released: premiere,
        duration: duration,
        idDirector: idDirector,
        idStudio: idStudio,
        genres: idsGenre,
        rating: 0
      })
      , axiosConfig)
      .then(res => {
        console.log('Update film bool:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data) {
          throw new Error(res.error)
        }
        return res
      })
  },
  /**/
  remove (id) {
    return axios.post(BACKEND_URL + '/films.php',
      'request=DELETE' + '&data=' +
      JSON.stringify({
        id: id
      })
      , axiosConfig)
      .then(res => {
        console.log('Delete film bool:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data || res.error) {
          throw new Error(res.error)
        }
        return res
      })
  },
  /**/
  addActor (idFilm, idActor) {
    return axios.post(BACKEND_URL + '/films.php',
      'request=ADD_ACTOR' + '&data=' +
      JSON.stringify({
        id: idFilm,
        idActor: idActor
      })
      , axiosConfig)
      .then(res => {
        console.log('Update film add actor:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data) {
          throw new Error(res.error)
        }
        return res
      })
  },
  /**/
  delActor (idFilm, idActor) {
    return axios.post(BACKEND_URL + '/films.php',
      'request=DEL_ACTOR' + '&data=' +
      JSON.stringify({
        id: idFilm,
        idActor: idActor
      })
      , axiosConfig)
      .then(res => {
        console.log('Update film del actor:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data) {
          throw new Error(res.error)
        }
        return res
      })
  },
  /**/
  add2Genre (idFilm, idGenre) {

  },
  /**/
  add2Genres (idFilm, idGenresArr) {

  }

}

export default Films
