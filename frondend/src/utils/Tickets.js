
import axios from 'axios'
// import { BACKEND_URL } from './constant.js'
import { BACKEND_URL, axiosConfig } from './constant.js'

const Tickets = {
  /* [{
   * }]
   */
  getAll () {
    /*
    let query = `{
      values: projections {
          id
          price
          datetime
          film {
            id
            name
          }
          room {
            id
            name
            cinema {
              id
              name
            }
          }
        }
    }`
    return axios.post(BACKEND_URL, {
      query: query
    })
      .then(res => {
        return res.data.data.values
      })
      .then(res => {
        return res.map((item) => {
          let newItem = {}
          newItem.id = item.id
          newItem.datetime = item.datetime
          newItem.price = item.price
          newItem.idFilm = item.film.id
          newItem.film = item.film.name
          newItem.idCinema = item.room.cinema.id
          newItem.cinema = item.room.cinema.name
          newItem.idRoom = item.room.id
          newItem.room = item.room.name

          return newItem
        })
      })
      .catch(e => {
        return {}
      }) */
  },
  /* {
   * }
   */
  getById (id) {
    /*
    let query = `{
      values: projection(id: ${id}) {
          id
          price
          datetime
          film {
            id
            name
          }
          room {
            id
            name
            cinema {
              id
              name
            }
          }
        }
    }`
    return axios.post(BACKEND_URL, {
      query: query
    })
      .then(res => {
        return res.data.data.values
      })
      .then(item => {
        let newItem = {}
        newItem.id = item.id
        newItem.datetime = item.datetime
        newItem.price = item.price
        newItem.idFilm = item.film.id
        newItem.film = item.film.name
        newItem.idCinema = item.room.cinema.id
        newItem.cinema = item.room.cinema.name
        newItem.idRoom = item.room.id
        newItem.room = item.room.name

        return newItem
      })

      .catch(e => {
        return {}
      }) */
  },

  /* [{
   *   id
   *   seat
   *   datetime
   *   idFilm
   *   film
   *   idCinema
   *   cinema
   *   idRoom
   *   room
   *   price
   *   salePrice // sleva o konstantu
   *   salePrecentage // sleva o procenta
   * }]
   */
  getByIdClient (id) {
    /*
    let query = `{
      values: clientTickets(idClient: ${id}) {
          id
          seat
          projection {
            datetime
            price
            room {
              id
              name
              cinema {
                id
                name
              }
            }
            film {
              id
              name
            }

          }
          sale {
            price
            precentage
          }
        }
    }`
    return axios.post(BACKEND_URL, {
      query: query
    })
      .then(res => {
        return res.data.data.values
      })
      .then(res => {
        return res.map((item) => {
          let newItem = {}
          newItem.id = item.id
          newItem.seat = item.seat
          newItem.datetime = item.projection.datetime
          newItem.idFilm = item.projection.film.id
          newItem.film = item.projection.film.name
          newItem.idCinema = item.projection.room.cinema.id
          newItem.cinema = item.projection.room.cinema.name
          newItem.idRoom = item.projection.room.id
          newItem.room = item.projection.room.name
          newItem.price = item.projection.price
          if (item.sale) {
            newItem.salePrice = item.sale.price
            newItem.salePrecentage = item.sale.precentage
          } else {
            newItem.salePrice = 0
            newItem.salePrecentage = 0
          }

          return newItem
        })
      })
      .catch(e => {
        return {}
      }) */
  },
  /* [{
   *   id
   *   seat
   *   datetime
   *   idFilm
   *   film
   *   idCinema
   *   cinema
   *   idRoom
   *   room
   *   price
   *   salePrice // sleva o konstantu
   *   salePrecentage // sleva o procenta
   * }]
   */
  /*
  getByIdReservation (id) {
    let query = `{
      values: reservationTickets(idReservation: ${id}) {
          id
          seat
          projection {
            datetime
            price
            room {
              id
              name
              cinema {
                id
                name
              }
            }
            film {
              id
              name
            }
          }
          sale {
            price
            precentage
          }
        }
    }`
    return axios.post(BACKEND_URL, {
      query: query
    })
      .then(res => {
        return res.data.data.values
      })
      .then(res => {
        return res.map((item) => {
          let newItem = {}
          newItem.id = item.id
          newItem.seat = item.seat
          newItem.datetime = item.projection.datetime
          newItem.idFilm = item.projection.film.id
          newItem.film = item.projection.film.name
          newItem.idCinema = item.projection.room.cinema.id
          newItem.cinema = item.projection.room.cinema.name
          newItem.idRoom = item.projection.room.id
          newItem.room = item.projection.room.name
          newItem.price = item.projection.price
          if (item.sale) {
            newItem.salePrice = item.sale.price
            newItem.salePrecentage = item.sale.precentage
          } else {
            newItem.salePrice = 0
            newItem.salePrecentage = 0
          }

          return newItem
        })
      })
      .catch(e => {
        return {}
      })
  }, */
  /* [{
   *   id
   *   seat
   * }]
   */
  getByIdProjection (id) {
    return axios.post(BACKEND_URL + '/tickets.php',
      'request=SELECT_PROJECTION' + '&data=' +
      JSON.stringify({
        idProjection: id
      })
      , axiosConfig)
      .then(res => {
        console.log('projection tickets:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data) {
          throw new Error(res.error)
        }
        return res
      })
      .then(res => {
        let newResult = res.data.map(value => {
          value.id = Number(value.idTicket)
          value.seat = Number(value.seatNumber)
          return value
        })
        return newResult
      })
  },
  getByIdReservation (id) {
    return axios.post(BACKEND_URL + '/tickets.php',
      'request=SELECT_RESERVATION' + '&data=' +
      JSON.stringify({
        idReservation: id
      })
      , axiosConfig)
      .then(res => {
        console.log('reservation tickets:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data) {
          throw new Error(res.error)
        }
        return res
      })
      .then(res => {
        let newResult = res.data.map(value => {
          value.id = Number(value.idTicket)
          value.seat = Number(value.seatNumber)
          return value
        })
        return newResult
      })
  },

  /**/
  create (seat, idProjection, idSale) {

  },
  /**/
  update (id, seat, idProjection, idSale) {

  },
  /**/
  remove (id) {

  }

}

export default Tickets
