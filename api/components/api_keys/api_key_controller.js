
// TODO API KEY GENERATOR
const MongoLib = require('../../../lib/mongo');

class apiKeysTokenController {
  constructor() {
    this.collection = 'api_keys';
    this.mongoDB = new MongoLib();
  }

  async getApiKeyToken({ apiKey }) {
    const [apiKeyToken] = await this.mongoDB.getAll(this.collection, { apiKey });
    return apiKeyToken;
  }

  // TODO 
  async createApiKeyToken({ apiKey }) {
    const { token, scopes} = apiKey;
    const createApiKeyToken = await this.mongoDB.create(this.collection, {
      token,
      scopes
    });

    return createApiKeyToken;
  }

}

module.exports = apiKeysTokenController;
