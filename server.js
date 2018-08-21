import { ApolloServer, gql } from 'apollo-server';
import { MvrpAPI } from './datasource';

//console.log(new MvrpAPI().getAllCars());

const typeDefs = gql`
  type Car {
    id: Int!
    plateNumber: String!
    color: String!
    model: String!
    chasisNumber: String!
    status: String!
    productionYear: Int!
    issueDate: String!
    expiryDate: String!
  }

  type Query {
    searchCars(plateNumber: String!): Car
    getAllCars: [Car]
  }
`;

const resolvers = {
  Query: {
    searchCars: async (root, { plateNumber }, { dataSources }) => {
      return dataSources.mvrpAPI.searchCars(plateNumber);
    },
    getAllCars: async (root, args, { dataSources }) => {
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