import { ApolloServer, gql } from 'apollo-server';
import mapKeys from 'lodash/mapKeys';
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
      const car = await dataSources.mvrpAPI.getACar(plateNumber);
      return mapKeys(car, (value, key) => {
         if (key === 'status') return 'vehicleStatus';
         if (key === 'productionYear' ) return 'yearOfManufacture';
         return key;
      });
    },
    cars: async (root, args, { dataSources }) => {
      const cars = await dataSources.mvrpAPI.getAllCars();
      return cars.map(car => ({...car, vehicleStatus: car.status, yearOfManufacture: car.productionYear}));
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