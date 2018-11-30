
const db = require('./dbconnection.js');

const Actor = require('./actor.js');
const Cinema = require('./cinema.js');
const Director = require('./director.js');
const Film = require('./film.js');
const Genre = require('./genre.js');
const Projection = require('./projection.js');
const Room = require('./room.js');
const Studio = require('./studio.js');
const Job = require('./job.js');

const Client = require('./client.js');
const Ticket = require('./ticket.js');
const Sale = require('./sale.js');
const State = require('./state.js');
const Reservation = require('./reservation.js');
const Worker = require('./worker.js');


const models = {
  db,
  Actor,
  Cinema,
  Director,
  Film,
  Genre,
  Projection,
  Room,
  Studio,
  Job,

  Client,
  Ticket,
  Sale,
  State,
  Reservation,
  Worker,
}

module.exports.models = models;
