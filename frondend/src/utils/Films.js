
import axios from 'axios'
import BACKEND_URL from './constant.js'

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
      })
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
      })
  }

}

export default Films
