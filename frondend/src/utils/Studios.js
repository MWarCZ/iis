
import axios from 'axios'
import BACKEND_URL from './constant.js'

const Studios = {
  /* [{
   *   id
   *   name
   * }]
   */
  getAll () {
    let query = `{
      values: studios {
        id
        name
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
   * }
   */
  getById (id) {
    let query = `{
      values: studio(id: ${id}) {
        id
        name
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

export default Studios
