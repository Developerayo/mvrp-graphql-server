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
    car: async (root, { plateNumber }, { dataSources }) => {
      return dataSources.mvrpAPI.getACar(plateNumber);
    },
    cars: async (root, args, { dataSources }) => {
      return dataSources.mvrpAPI.getAllCars();
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    mvrpAPI: new MvrpAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});