
import { BACKEND_URL } from './constant.js'
import Cinemas from './Cinemas.js'
import Films from './Films.js'
import Genres from './Genres.js'
import Rooms from './Rooms.js'
import Projections from './Projections.js'
import Tickets from './Tickets.js'
import Reservations from './Reservations.js'
import Clients from './Clients.js'
import Workers from './Workers.js'
import Actors from './Actors.js'
import Directors from './Directors.js'
import Studios from './Studios.js'
import Discounts from './Discounts.js'

const backend = {
  Cinemas,
  Films,
  Genres,
  Rooms,
  Projections,
  Tickets,
  Reservations,
  Clients,
  Workers,
  Actors,
  Directors,
  Studios,
  Discounts,

  url: BACKEND_URL
}

export default backend
