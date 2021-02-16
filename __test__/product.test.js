const request = require('supertest')
const clearProducts = require('./helpers/clearProducts')
const models = require('../models')
const app = require('../app')

describe('POST/ create product', function () {
  afterAll(function (done) {
    clearProducts()
    .then(() => {
      models.sequelize.close()
      done()
    })
  })
  
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYxMzQ2MzgzMn0.4ZGTN9csJCZKfseSReWvOcQYcJnsQ3dUEIgmLiVS9nM'

  it('should response with 201 status code when succseed', function (done) {
    //setup
    const body = {
      name: 'test1',
      image_url: 'test',
      price: 12000,
      stock: 10,
    }

    //execute
    request(app)
    .post('/products')
    .set('access_token', token)
    .send(body)
    .end(function (err, res) {
      //error supertest
      if (err) done(err);

      //assert
      expect(res.statusCode).toEqual(201)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('id')
      expect(res.body).toHaveProperty('name')
      expect(res.body.name).toEqual(body.name)
      expect(res.body).toHaveProperty('image_url')
      expect(res.body.image_url).toEqual(body.image_url)
      expect(res.body).toHaveProperty('price')
      expect(res.body.price).toEqual(body.price)
      expect(res.body).toHaveProperty('stock')
      expect(res.body.stock).toEqual(body.stock)

      done()
    })
  })

  it('should response with 400 status code when name is empty', function (done) {
    //setup
    const body = {
      name: '',
      image_url: 'test',
      price: 'test',
      stock: 'test',
    }

    //execute
    request(app)
    .post('/products')
    .set('access_token', token)
    .send(body)
    .end(function (err, res) {
      // error supertest
      if(err) done(err)

      //assert
      expect(res.statusCode).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('errors')

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

