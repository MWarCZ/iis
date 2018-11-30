
const Query = require('./Query.js')
const {
  Mutation,
  MutationCreate,
  MutationUpdate,
  MutationRemove,
} = require('./Mutations.js')

var GLOBAL_VALUE_X = 0;

const resolvers = {
  Query,
  Mutation,

  MutationCreate,
  MutationUpdate,
  MutationRemove,


  Actor: {
    films: (parent, args, { models }) => {
      /*
      let playInFilm = models.PlayIn.getByIdActor(parent.id);
      let films = playInFilm.map((playIn)=>{
        return models.Film.getById(playIn.idFilm);
      });
      */
      let films = models.Film.getByIdActor(parent.id)
      return films;
    },
  },
  Cinema: {
    rooms: (parent, args, { models }) => {
      return models.Room.getByIdCinema(parent.id);
    },
  },
  Film: {
    /*
    premiere: (parent, args, { models })=> {
      let date =
        parent.premiere.getFullYear() + '-' +
        ('0' + (parent.premiere.getMonth() + 1)).slice(-2) + '-' +
        ('0' + parent.premiere.getDate()).slice(-2) + ' ' +
        ('0' + parent.premiere.getHours()).slice(-2) + ':' +
        ('0' + parent.premiere.getMinutes()).slice(-2);
      return date;
      //return parent.premiere;
    },
    */
    director: (parent, args, { models }) => {
      return models.Director.getById(parent.idDirector);
    },
    studio: (parent, args, { models }) => {
      return models.Studio.getById(parent.idStudio);
    },
    actors: (parent, args, { models }) => {
      /*
      let playInFilm = models.PlayIn.getByIdFilm(parent.id);
      let actors = playInFilm.map((playIn)=>{
        return models.Actor.getById(playIn.idActor);
      });
      */
      let actors = models.Actor.getByIdFilm(parent.id)
      return actors;
    },
    genres: (parent, args, { models }) => {
      /*
      let divisionInto = models.DivisionInto.getByIdFilm(parent.id);
      let genres = divisionInto.map((division)=>{
        return models.Genre.getById(division.idGenre);
      });
      */
      let genres = models.Genre.getByIdFilm(parent.id)
      return genres;
    },
  },
  Room: {
    cinema: (parent, args, { models }) => {
      return models.Cinema.getById(parent.idCinema);
    },
  },
  /*
  ProjectionType: {
    film: (parent, args, { models }) => {
      return models.Film.getById(parent.idFilm);
    },
  },
  */
  Projection: {
    room: (parent, args, { models }) => {
      return models.Room.getById(parent.idRoom);
    },
    film: (parent, args, { models }) => {
      return models.Film.getById(parent.idFilm);
    },
    /*
    type: (parent, args, { models }) => {
      return models.ProjectionType.getById(parent.idProjectionType);
    },
    */
  },
  Client: {
    tickets: (parent, args, { models }) => {
      return models.Ticket.getByIdClient(parent.id);
    },
    reservations: (parent, args, { models }) => {
      return models.Reservation.getByIdClient(parent.id);
    },
  },
  Ticket: {
    reservation: (parent, args, { models }) => {
      return models.Reservation.getById(parent.idReservation);
    },
    buyer: (parent, args, { models }) => {
      return models.Client.getById(parent.idClient);
    },
    sale: (parent, args, { models }) => {
      return models.Sale.getById(parent.idSale);
    },
    projection: (parent, args, { models }) => {
      return models.Projection.getById(parent.idProjection);
    },
  },
  Reservation: {
    client: (parent, args, { models }) => {
      return models.Client.getById(parent.idClient);
    },
    tickets: (parent, args, { models }) => {
      return models.Ticket.getByIdReservation(parent.id);
    },
    state: (parent, args, { models }) => {
      return models.State.getById(parent.idState)
    },
  },
  Worker: {
    cinema: (parent, args, { models }) => {
      return models.Cinema.getById(parent.idCinema)
    },
    job:  (parent, args, { models }) => {
      return models.Job.getByIdWorker(parent.id)
    },
  },

};

module.exports = resolvers;

