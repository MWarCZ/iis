
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
  },

  /* {
   *   id
   *   name
   * }
   */
  getById (id) {
    let query = `{
        values: genre(id: ${id}) {
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

  /// //////// ///
  //  ADD NEW   //
  /// //////// ///

  /* OK:
   * {
   *   id
   *   name
   * }
   *
   * KO:
   *   null | false
   */
  add (name) {
    // TODO
    return axios.post(BACKEND_URL, {
    })
      .then(res => {
        return res.data
      })
      .catch(e => {
        return undefined
      })
  },

  /// ////// ///
  //  UPDATE  //
  /// ////// ///

  /* OK:
   * {
   *   id
   *   name
   * }
   *
   * KO:
   *   null | false
   */
  update (id, name) {
    // TODO
    return axios.post(BACKEND_URL, {
    })
      .then(res => {
        return res.data
      })
      .catch(e => {
        return undefined
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

export default Genres
