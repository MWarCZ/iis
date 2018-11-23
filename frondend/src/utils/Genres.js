
import axios from 'axios'
import BACKEND_URL from './constant.js'

const Genres = {
  /* [{
   *   id
   *   name
   * }]
   */
  getAll () {
    let query = `{
      values: genres {
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

export default Genres
