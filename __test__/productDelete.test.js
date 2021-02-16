const request = require('supertest')
const app = require('../app')
const models = require('../models')

let id
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYxMzQ2MzgzMn0.4ZGTN9csJCZKfseSReWvOcQYcJnsQ3dUEIgmLiVS9nM'
const customerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYxMzQ2NjQwMX0.woV-HCfrRJhZw6qAeybLSXGFHqatGC57SOxRegMO0sA'

describe('DELETE/ deleteProduct', function () {

  afterAll(function (done) {
    models.sequelize.close()
    done()
  })

  beforeAll (function (done) {

    const body = {
      name: 'test1',
      image_url: 'test',
      price: 12000,
      stock: 10,
    }

    request(app)
    .post('/products')
    .set('access_token', token)
    .send(body)
    .end(function (err, res) {
      if (err) done(err)
      id = res.body.id
      done()
    })
  })

  it('should response with 200 status code when delete succeed', function (done) {
    //setup

    //execute
    request(app)
    .delete(`/products/${id}`)
    .set('access_token', token)
    .end(function (err, res) {
      //error supertest
      if (err) done(err)

      //assert
      expect(res.statusCode).toEqual(200)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('message')
      
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
    .delete(`/products/${id}`)
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

  it('should response with 403 status code when user role is not admin', function (done) {
    //setup
    const body = {
      name: 'test',
      image_url: 'test',
      price: 'test',
      stock: 'test',
    }

    //execute
    request(app)
    .delete(`/products/${id}`)
    .set('access_token', customerToken)
    .send(body)
    .end(function (err, res) {
      // error supertest
      if(err) done(err)

      //assert
      expect(res.statusCode).toEqual(403)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('errors')

      done()
    })
  })
  
})