
import axios from 'axios'
import BACKEND_URL from './constant.js'

const Cinemas = {
  /* [{
   *   id
   *   name
   *   address
   * }]
   */
  getAll () {
    let query = `{
      values: cinemas {
          id
          name
          address
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
     *   address
     * }
     */
  getById (id) {
    let query = `{
        values: cinema(id: ${id}) {
          id
          name
          address
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
}// Cinemas

export default Cinemas
