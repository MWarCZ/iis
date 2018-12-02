
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

  /*
    id
    reserved
    totalPrice
    isPaid
    isPicked
    isStorno
   */
  getByIdClient (id) {
    return axios.post(BACKEND_URL + '/reservations.php',
      'request=SELECT_USER' + '&data=' +
      JSON.stringify({
        id: id
      })
      , axiosConfig)
      .then(res => {
        console.log('User reservations:', res.data)
        return res.data
      })
      .then(res => {
        let newRes = res.data.map(value => {
          value.id = Number(value.idReservation)
          value.reserved = value.reserved
          value.totalPrice = Number(value.totalPrice)
          value.isPaid = !!value.paid
          value.isPicked = !!value.picked
          value.isStorno = !!value.storno

          return value
        })
        console.log('User reservations:', newRes)
        return newRes
      })
      /*
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
      }) */
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
