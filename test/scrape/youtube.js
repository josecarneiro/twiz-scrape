'use strict';

/* DEPENDENCIES */
const expect = require('chai').expect;
const scrape = require('./setup');

const util = require('util');
let debug = true;
let log = object => { if (debug) console.log(util.inspect(object, { colors: true, depth: 4 })); };

/* TESTS */
describe('Youtube', () => {

  it('should parse youtube video url.', done => {
    let id = 'KwjYhvY8cbY';
    scrape.scrape({ url: `https://www.youtube.com/watch?v=${id}` })
    .then(data => {
      log(data);
      expect(data.service).to.equal('youtube');
      expect(data.data.id).to.equal(id);
      expect(data.meta.title).to.be.a('string');
      expect(data.meta.description).to.be.a('string');
      done();
    })
    .catch(done);
  });
});
