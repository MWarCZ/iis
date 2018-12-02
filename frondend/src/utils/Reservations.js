
import axios from 'axios'
import { BACKEND_URL } from './constant.js'
// import { BACKEND_URL , axiosConfig } from './constant.js'

const Reservations = {
  /* [{
   *   id
   *   code
   *   registrated
   * }]
   */
  getAll () {
    let query = `{
      values: reservations {
        id
        code
        registrated
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
   *   code
   *   registrated
   * }
   */
  getById (id) {
    let query = `{
      values: reservation(id: ${id}) {
        id
        code
        registrated
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

  getByIdClient (id) {
    let query = `{
      values: clientReservations (idClient: ${id}) {
        id
        code
        registrated
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

  /**/
  create (idClient) {

  },
  createForTickets (idClient, idTicketsArr) {

  },

  /**/
  addTicket (idReservation, idTicket) {

  },
  /**/
  addTickets (idReservation, idTicketsArr) {

  },

  /**/
  createAndSell (idTicketsArr) {

  }

}

export default Reservations
