const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');

class App {
  constructor(){
    this.server = express();
    
    this.database();
    this.middlewares();
    this.routes();
  }

  database(){
    this.mongoose = mongoose.
    connect('mongodb+srv://leonardo:leonardo@omni10-vqysw.mongodb.net/week10?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;