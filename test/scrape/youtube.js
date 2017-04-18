'use strict';

/* DEPENDENCIES */
const expect = require('chai').expect;
const config = require('./../../../config');
const request = require('supertest')(`${config.base}/scrape`);

const util = require('util');
let debug = true;
let log = object => { if (debug) console.log(util.inspect(object, { colors: true, depth: 4 })); };

/* TESTS */
describe('Youtube', () => {

  it('should parse youtube video url.', (done) => {
    let id = 'KwjYhvY8cbY';

    request
    .post('/parse')
    .send({
      data: {
        url: `https://www.youtube.com/watch?v=${id}`
      }
    })
    .expect(200)
    .end((error, res) => {
      if (error) return done(error);
      let data = res.body.data;
      log(data);
      expect(data.service).to.equal('youtube');
      expect(data.data.id).to.equal(id);
      expect(data.meta.title).to.be.a('string');
      expect(data.meta.description).to.be.a('string');
      return done();
    });
  });
});
