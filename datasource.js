import { RESTDataSource } from 'apollo-datasource-rest';

export class MvrpAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://mvrp.herokuapp.com/api/';
  }

  async getAllCars() {
    return this.get('cars');
  }

  async searchCars(plateNumber) {
    const result = await this.get('car', {
      plateNumber
    });

    return result;
  }
};