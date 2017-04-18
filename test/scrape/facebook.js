'use strict';

/* DEPENDENCIES */
// const expect = require('chai').expect;
const config = require('./../../../config/test');
const request = require('supertest')(`${config.base}/scrape`);

const util = require('util');
let debug = false;
let log = object => { if (debug) console.log(util.inspect(object.data, { colors: true, depth: 4 })); };

/* TESTS */
describe('Facebook', () => {

  it('should parse facebook url.', (done) => {
    request
    .post('/parse')
    .send({
      data: {
        url: 'http://facebook.com'
      }
    })
    .expect(200)
    .end((error, res) => {
      if (error) return done(error);
      log(res.body);
      return done();
    });
  });

  it('should parse facebook profile.', (done) => {
    request
    .post('/parse')
    .send({
      data: {
        url: 'http://facebook.com/josemcarneiro'
      }
    })
    .expect(200)
    .end((error, res) => {
      if (error) return done(error);
      log(res.body);
      return done();
    });
  });

});
