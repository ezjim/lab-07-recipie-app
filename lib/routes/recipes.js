// const Recipe = require('../models/Recipe');
// const { Router } = require('express');

// module.exports = Router()

// //first route
//   .get('/', async(req, res) => {
//     const recipes = await Recipe.find();
//     res.send(recipes);

//   });


const { Router } = require('express');
const Recipe = require('../models/Recipe');

module.exports = Router()
  .post('/', (req, res) => {
    Recipe
      .create(req.body)
      .then(recipe => res.send(recipe));
  })
    
  .get('/', (req, res) => {
    Recipe
      .find()
      .select({ name: true })
      .then(recipes => res.send(recipes));
  });
