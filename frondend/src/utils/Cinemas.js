
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
  },

  /// /////// ///
  //  ADD NEW  //
  /// /////// ///

  /* OK:
   * {
   *   id
   *   name
   *   address
   * }
   *
   * KO:
   *   null | false
   */
  create (name, address, imgUrl) {
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
   *   address
   * }
   *
   * KO:
   *   null | false
   */
  update (id, name, address, imgUrl) {
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

export default Cinemas
