
import axios from 'axios'
import BACKEND_URL from './constant.js'

const Directors = {
  /* [{
   *   id
   *   firstname
   *   lastname
   * }]
   */
  getAll () {
    let query = `{
      values: directors {
        id
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
  },
  /* {
   *   id
   *   firstname
   *   lastname
   * }
   */
  getById (id) {
    let query = `{
      values: director(id: ${id}) {
        id
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
  }

}

export default Directors
