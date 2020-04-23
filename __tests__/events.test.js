require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Event = require('../lib/models/Event');
const Recipe = require('../lib/models/Recipe');

describe('event routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates an event', () => {
    return Recipe.create({
      name: 'cookies',
      ingredients: [
        { name: 'flour', amount: 1, measurement: 'cup' }
      ],
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ],
    })
      .then(recipe => {
        return request(app)
          .post('/api/v1/events')
          .send({
            recipeId: recipe.id,
            dateOfEvent: Date.now(),
            notes: 'It went well',
            rating: 4
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipeId: expect.any(String),
          dateOfEvent: expect.any(String),
          notes: 'It went well',
          rating: 4,
          __v: 0
        });
      });
  });
});

// it('gets an event by id', async() => {
//   const recipe = await Recipe.create({
//     name: 'cookies',
//     ingredients: [
//       { name: 'flour', amount: 1, measurement: 'cup' }
//     ],
//     directions: [
//       'preheat oven to 375',
//       'mix ingredients',
//       'put dough on cookie sheet',
//       'bake for 10 minutes'
//     ],
//   });

//   const event = await Event.create({
//     recipeId: recipe.id,
//     dateOfEvent: Date.now(),
//     notes: 'It went well',
//     rating: 4
//   });

//   return request(app)
//     .get(`/api/v1/events/${event._id}`)
//     .then(res => {
//       expect(res.body).toEqual({
//         _id: expect.any(String),
//         // whole recipe here because we populate in route
//         recipeId: {
//           _id: expect.any(String),
//           name: 'cookies',
//           ingredients: [
//             { _id: expect.any(String), name: 'flour', amount: 1, measurement: 'cup' }
//           ],
//           directions: [
//             'preheat oven to 375',
//             'mix ingredients',
//             'put dough on cookie sheet',
//             'bake for 10 minutes'
//           ],
//           __v: 0
//         },
//         dateOfEvent: expect.any(String),
//         notes: 'It went well',
//         rating: 4,
//         __v: 0
//       });
//     });
// });

