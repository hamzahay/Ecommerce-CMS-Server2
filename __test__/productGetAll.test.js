const request = require('supertest')
const app = require('../app')
const models = require('../models')

describe('GET/ show all products', function () {
  afterAll (function (done) {
    models.sequelize.close()
    done()
  })

  it('should response with 200 status code when succseed', function (done) {
    //setup

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYxMzQ2MzgzMn0.4ZGTN9csJCZKfseSReWvOcQYcJnsQ3dUEIgmLiVS9nM'

    //execute
    request(app)
    .get('/products')
    .set('access_token', token)
    .end(function (err, res) {
      //error supertest
      if (err) done(err)

      //assert
      expect(res.statusCode).toEqual(200)
      expect(typeof res.body).toEqual('object')

      done()
    })
  })

  it('should response with 401 status code when access_token is not found', function (done) {
    //setup
    const body = {
      name: 'test',
      image_url: 'test',
      price: 'test',
      stock: 'test',
    }

    //execute
    request(app)
    .post('/products')
    .send(body)
    .end(function (err, res) {
      // error supertest
      if(err) done(err)

      //assert
      expect(res.statusCode).toEqual(401)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('errors')

      done()
    })
  })
})