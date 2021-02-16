const request = require('supertest')
const app = require('../app')
const models = require('../models')

describe('POST/ login', function () {
  afterAll(function (done) {
    models.sequelize.close()
  })

  it('should response with 200 status code when login succeed', function (done) {
    //setup
    const body = {
      email: 'admin@mail.com',
      password: '1234',
    }

    //execute
    request(app)
    .post('/login')
    .send(body)
    .end(function (err, res) {
      //error supertest
      if (err) done(err);

      //assert
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('access_token')
      expect(res.body).toHaveProperty('id')
      expect(res.body).toHaveProperty('email')
      expect(res.body).toHaveProperty('role')

      done()
    })
  })

  it('should response with 404 status code when email / password wrong', function (done) {
    //setup
    const body = {
      email: 'admim@mail.com',
      password: '123',
    }

    //execute
    request(app)
    .post('/login')
    .send(body)
    .end(function (err, res) {
      //error supertest
      if (err) done(err)

      //assert
      expect(res.statusCode).toEqual(401)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('errors')

      done()
    })
  })
})