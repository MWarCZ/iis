
import axios from 'axios'
// import { BACKEND_URL } from './constant.js'
import { BACKEND_URL, axiosConfig } from './constant.js'

const Reservations = {
  /* [{
   *   id
   *   code
   *   registrated
   * }]
   */
  getAll () {
    return axios.post(BACKEND_URL + '/reservations.php',
      'request=SELECT_ALL'
      , axiosConfig)
      .then(res => {
        console.log('All reservations:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data) {
          throw new Error(res.error)
        }
        return res
      })
      .then(res => {
        let newRes = res.data.map(value => {
          value.id = Number(value.idReservation)
          value.reserved = value.reserved
          value.totalPrice = Number(value.totalPrice)
          value.paid = Number(value.paid)
          value.picked = Number(value.picked)

          return value
        })
        console.log('All reservations:', newRes)
        return newRes
      })
    /*
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
      */
  },
  /* {
   *   id
   *   code
   *   registrated
   * }
   */
  getById (id) {
    return axios.post(BACKEND_URL + '/reservations.php',
      'request=SELECT' + '&data=' +
      JSON.stringify({
        id: id
      })
      , axiosConfig)
      .then(res => {
        console.log('Id reservation:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data) {
          throw new Error(res.error)
        }
        return res
      })
      .then(res => {
        let newRes = res.data.map(value => {
          value.id = Number(value.idReservation)
          value.reserved = value.reserved
          value.totalPrice = Number(value.totalPrice)
          value.paid = Number(value.paid)
          value.picked = Number(value.picked)

          return value
        })
        console.log('Id reservation:', newRes)
        return newRes[0]
      })
    /*
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
      */
  },

  /*
    id
    reserved
    totalPrice
    paid
    picked
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
        if (!res.data) {
          throw new Error(res.error)
        }
        return res
      })
      .then(res => {
        let newRes = res.data.map(value => {
          value.id = Number(value.idReservation)
          value.reserved = value.reserved
          value.totalPrice = Number(value.totalPrice)
          value.paid = Number(value.paid)
          value.picked = Number(value.picked)

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
  getByDate (date) {
    return axios.post(BACKEND_URL + '/reservations.php',
      'request=SELECT_BYDATE' + '&data=' +
      JSON.stringify({
        date: date
      })
      , axiosConfig)
      .then(res => {
        console.log('ByDate reservations:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data) {
          throw new Error(res.error)
        }
        return res
      })
      .then(res => {
        let newRes = res.data.map(value => {
          value.id = Number(value.idReservation)
          value.reserved = value.reserved
          value.totalPrice = Number(value.totalPrice)
          value.paid = Number(value.paid)
          value.picked = Number(value.picked)

          return value
        })
        console.log('ByDate reservations:', newRes)
        return newRes
      })
  },

  /**/
  create (tickets, idClient = null) {
    console.log('RESERVE Tickets:', tickets, ' | idClient:', idClient)
    return axios.post(BACKEND_URL + '/reservations.php',
      'request=RESERVE' + '&data=' +
      JSON.stringify({
        idUser: idClient,
        tickets: tickets
      })
      , axiosConfig)
      .then(res => {
        console.log('New reservation id:', res.data)
        return res.data
      })
  },
  /**/
  remove (id) {
    return axios.post(BACKEND_URL + '/reservations.php',
      'request=CANCEL' + '&data=' +
      JSON.stringify({
        id: id
      })
      , axiosConfig)
      .then(res => {
        console.log('Delete reservation bool:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data) {
          throw new Error(res.error)
        }
        return res
      })
  },
  payAndPick (id) {
    return axios.post(BACKEND_URL + '/reservations.php',
      'request=PAY_PICK' + '&data=' +
      JSON.stringify({
        id: id
      })
      , axiosConfig)
      .then(res => {
        console.log('payAndPick reservation bool:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data) {
          throw new Error(res.error)
        }
        return res
      })
  },
  pick (id) {
    return axios.post(BACKEND_URL + '/reservations.php',
      'request=PICK' + '&data=' +
      JSON.stringify({
        id: id
      })
      , axiosConfig)
      .then(res => {
        console.log('Pick reservation bool:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data) {
          throw new Error(res.error)
        }
        return res
      })
  },
  pay (id) {
    return axios.post(BACKEND_URL + '/reservations.php',
      'request=PAY' + '&data=' +
      JSON.stringify({
        id: id
      })
      , axiosConfig)
      .then(res => {
        console.log('Pick reservation bool:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data) {
          throw new Error(res.error)
        }
        return res
      })
  }

/*
  createAndSell (idTicketsArr) {

  },
  createForTickets (idClient, idTicketsArr) {

  },
  addTicket (idReservation, idTicket) {

  },
  addTickets (idReservation, idTicketsArr) {

  },
*/

}

export default Reservations
