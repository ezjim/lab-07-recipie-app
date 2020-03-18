const { Router } = require('express');
const Event = require('../models/Event');

module.exports = Router()
  .post('/', (req, res) => {
    Event
      .create(req.body)
      .then(event => res.send(event));
  })
    
  .get('/', (req, res) => {
    Event
      .find()
      .select({ name: true })
      .then(events => res.send(events));
  })