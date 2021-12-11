const mongoose = require('mongoose')

module.exports = class {
  constructor(connection) {
    this.connection = connection

  }

  connect() {
    return mongoose.connect(
      this.connection,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true
      }
    )
  }

  disconnect() {
    return mongoose.disconnect()
  }

  async reset() {
    const collections = await mongoose.connection.db.collections()
    for (let collection of collections) await collection.drop()
    return true
  }
}