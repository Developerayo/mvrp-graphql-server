import { ApolloServer, gql } from 'apollo-server';
import { MvrpAPI } from './datasource';

const typeDefs = gql`
  type Car {
    id: Int!
    plateNumber: String!
    color: String!
    model: String!
    chasisNumber: String!
    vehicleStatus: String!
    yearOfManufacture: Int!
    issueDate: String!
    expiryDate: String!
  }

  type Query {
    car(plateNumber: String!): Car
    cars: [Car]
  }
`;

const resolvers = {
  Query: {
    car: async (root, { plateNumber }, { dataSources }) =>
      dataSources.mvrpAPI.getACar(plateNumber),
    cars: (root, args, { dataSources }) => dataSources.mvrpAPI.getAllCars(),
  },
  Car: {
    vehicleStatus: ({ status }) => status,
    yearOfManufacture: ({ productionYear }) => productionYear,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    mvrpAPI: new MvrpAPI(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
