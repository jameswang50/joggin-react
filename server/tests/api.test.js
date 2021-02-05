const express = require('express');
const request = require('supertest');
const mongoose = require('mongoose');
const backendMiddleware = require('../middlewares/backendMiddleware');
const app = express();

describe('api', () => {
  beforeAll((done) => {
    backendMiddleware(app, done);
  });

  afterAll((done) => {
    mongoose.disconnect();
    app.close(done);
  });

  test('should fail login with wrong credentials', () =>
    request(app).post('/api/auth/login')
    .send({
      email: 'test@test.com',
      password: 'test',
    }).then((resp) => {
      expect(resp.statusCode).toBe(500);
      expect(resp.body.message).toBe('Email or password does not match');
    })
  );

  test('should login with correct credentials', () =>
    request(app).post('/api/auth/login')
    .send({
      email: 'admin@admin.com',
      password: 'test123',
    }).then((resp) => {
      expect(resp.statusCode).toBe(200);
    })
  );
});
