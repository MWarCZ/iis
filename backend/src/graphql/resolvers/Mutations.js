
const Query = require('./Query.js')

var GLOBAL_VALUE_X = 0;

const Mutation = {
    createCinema: (parent, args, { models }) => {
      return false;
    },
    create: () => {
      return {};
    },
    update: () => {
      return {};
    },
    remove: () => {
      return {};
    },
};

const MutationCreate = {
    test: (parent, args, { models }) => {
      GLOBAL_VALUE_X++;
      return args.text + '! (' + GLOBAL_VALUE_X + ')';
    },
    cinema: (parent, args, { models }) => {
      GLOBAL_VALUE_X++;
      return models.Cinema.create(args.input)
    },
};
const MutationUpdate = {
    cinema: (parent, args, { models }) => {
      return models.Cinema.update(args.input)
    },
};
const MutationRemove = {
    cinema: (parent, args, { models }) => {
      return models.Cinema.remove(args.input)
    },
};

module.exports = {
  Mutation,
  MutationCreate,
  MutationUpdate,
  MutationRemove,
};

