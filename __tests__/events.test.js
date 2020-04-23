require('dotenv').config();

// const request = require('supertest');
// const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
// const Event = require('../lib/models/Event');

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
});

//   it('creates an event', () => {
//     return request(app)
//       .post('/api/v1/events')
//       .send({
//         recipeId: '1234',
//         dateOfEvent: Date.now(),
//         notes: 'It went well',
//         rating: 4
//       })
//       .then(res => {
//         expect(res.body).toEqual({
//           _id: expect.any(String),
//           recipeId: '1234',
//           dateOfEvent: expect.any(String),
//           notes: 'It went well',
//           rating: 4,
//           __v: 0
//         });
//       });
//   });
// });
