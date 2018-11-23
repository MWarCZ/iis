
import axios from 'axios'
import BACKEND_URL from './constant.js'

const Films = {
  /* [{
   *   id
   *   name
   *   premiere
   *   genres {
   *     id
   *     name
   *   }
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
   *   genres {
   *     id
   *     name
   *   }
   *   director {
   *     firstname
   *     lastname
   *   }
   *   studio {
   *     name
   *   }
   *   actors {
   *     firstname
   *     lastname
   *   }
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
          firstname
          lastname
        }
        studio {
          name
        }
        actors {
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
      .catch(e => {
        return {}
      })
  }

}

export default Films
