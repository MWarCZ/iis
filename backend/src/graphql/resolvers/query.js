
const Query = {
    cinema: async (parent, args, { models }, info) => {
      let cinema = models.Cinema.getById(args.id);
      return cinema;
    },
    cinemas: async (parent, args, { models }, info) => {
      let cinema = (args.limit)? models.Cinema.getAll(args.limit.first, args.limit.after) : models.Cinema.getAll();
      return cinema;
    },

    actor: async (parent, args, { models }, info) => {
      let actor = models.Actor.getById(args.id)
      return actor;
    },
    actors: async (parent, args, { models }, info) => {
      let actors = (args.limit)? models.Actor.getAll(args.limit.first, args.limit.after) : models.Actor.getAll() ;
      return actors;
    },

    director: async (parent, args, { models }, info) => {
      return models.Director.getById(args.id)
    },
    directors: async (parent, args, { models }, info) => {
      return (args.limit)? models.Director.getAll(args.limit.first, args.limit.after) : models.Director.getAll();
    },

    genre: async (parent, args, { models }, info) => {
      return models.Genre.getById(args.id)
    },
    genres: async (parent, args, { models }, info) => {
      return (args.limit)? models.Genre.getAll(args.limit.first, args.limit.after) : models.Genre.getAll();
    },

    film: async (parent, args, { models }, info) => {
      return models.Film.getById(args.id)
    },
    films: async (parent, args, { models }, info) => {
      return (args.limit)? models.Film.getAll(args.limit.first, args.limit.after) : models.Film.getAll();
    },

    state: async (parent, args, { models }, info) => {
      return models.State.getById(args.id)
    },
    states: async (parent, args, { models }, info) => {
      return (args.limit)? models.State.getAll(args.limit.first, args.limit.after) : models.State.getAll();
    },

    studio: async (parent, args, { models }, info) => {
      return models.Studio.getById(args.id)
    },
    studios: async (parent, args, { models }, info) => {
      return (args.limit)? models.Studio.getAll(args.limit.first, args.limit.after) : models.Studio.getAll();
    },

    room: async (parent, args, { models }, info) => {
      return models.Room.getById(args.id)
    },
    rooms: async (parent, args, { models }, info) => {
      return (args.limit)? models.Room.getAll(args.limit.first, args.limit.after) : models.Room.getAll();
    },
    cinemaRooms: async (parent, args, { models }, info) => {
      return models.Room.getByIdCinema(args.idCinema)
    },

  /*
    projectionType: async (parent, args, { models }, info) => {
      return models.ProjectionType.getById(args.id)
    },
    projectionTypes: async (parent, args, { models }, info) => {
      return (args.limit)? models.ProjectionType.getAll(args.limit.first, args.limit.after) : models.ProjectionType.getAll();
    },
    */

    projection: async (parent, args, { models }, info) => {
      return models.Projection.getById(args.id)
    },
    projections: async (parent, args, { models }, info) => {
      return (args.limit)? models.Projection.getAll(args.limit.first, args.limit.after) : models.Projection.getAll();
    },

    clientLogin: async (parent, args, { models }, info) => {
      return models.Client.getByLoginAndPassord(args.login, args.password);
    },
    client: async (parent, args, { models }, info) => {
      return models.Client.getById(args.id)
    },

    sale: async (parent, args, { models }, info) => {
      return models.Sale.getById(args.id)
    },
    sales: async (parent, args, { models }, info) => {
      return (args.limit)? models.Sale.getAll(args.limit.first, args.limit.after) : models.Sale.getAll();
    },

    ticket: async (parent, args, { models }, info) => {
      return models.Ticket.getById(args.id)
    },
    tickets: async (parent, args, { models }, info) => {
      return (args.limit)? models.Ticket.getAll(args.limit.first, args.limit.after) : models.Ticket.getAll();
    },
    clientTickets: async (parent, args, { models }, info) => {
      return models.Ticket.getByIdClient(args.idClient)
    },
    reservationTickets: async (parent, args, { models }, info) => {
      // console.log(args.idReservation, models.Ticket)
      return models.Ticket.getByIdReservation(args.idReservation)
    },
    projectionTickets: async (parent, args, { models }, info) => {
      return models.Ticket.getByIdProjection(args.idProjection)
    },

    reservation: async (parent, args, { models }, info) => {
      return models.Reservation.getById(args.id)
    },
    reservations: async (parent, args, { models }, info) => {
      return (args.limit)? models.Reservation.getAll(args.limit.first, args.limit.after) : models.Reservation.getAll();
    },
    clientReservations: async (parent, args, { models }, info) => {
      return models.Reservation.getByIdClient(args.idClient)
    },

    job: async (parent, args, { models }, info) => {
      return models.Job.getById(args.id)
    },
    jobs: async (parent, args, { models }, info) => {
      return (args.limit)? models.Job.getAll(args.limit.first, args.limit.after) : models.Job.getAll();
    },

    workerLogin: async (parent, args, { models }, info) => {
      return models.Worker.getByLoginAndPassord(args.login, args.password);
    },
    worker: async (parent, args, { models }, info) => {
      return models.Worker.getById(args.id)
    },
    workers: async (parent, args, { models }, info) => {
      return models.Worker.getAll(args.id)
    },

};

module.exports = Query;

