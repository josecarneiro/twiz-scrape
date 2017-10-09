'use strict';

/* DEPENDENCIES */
// const { expect } = require('chai');
const scrape = require('./setup');

const util = require('util');
let debug = false;
let log = object => { if (debug) console.log(util.inspect(object.data, { colors: true, depth: 4 })); };

/* TESTS */
describe('Facebook', () => {

  it('should parse facebook url.', done => {
    scrape.scrape({ url: 'http://facebook.com' })
    .then(data => {
      // log(data);
      done();
    })
    .catch(done);
  });

  it('should parse facebook profile.', done => {
    scrape.scrape({ url: 'http://facebook.com/josemcarneiro' })
    .then(data => {
      log(data);
      done();
    })
    .catch(done);
  });

});
