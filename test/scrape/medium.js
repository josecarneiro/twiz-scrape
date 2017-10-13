'use strict';

/* DEPENDENCIES */
const { expect } = require('chai');
const scrape = require('./setup');

const util = require('util');
let debug = false;
let log = object => { if (debug) console.log(util.inspect(object.data, { colors: true, depth: 4 })); };

let urls = {
  article: 'https://medium.com/@wtfmitchel/5-reasons-to-work-for-microsoft-44abb28303a7?ref=la',
  publicationArticle: 'https://medium.com/styled-components/announcing-v2-f01ef3766ac2?source=collection_home---4------0-----------',
  publication: 'https://medium.com/styled-components'
};

/* TESTS */
describe('Medium.com', () => {

  it('should parse article.', done => {
    scrape.scrape({ url: urls.article })
    .then(data => {
      log(data);
      done();
    })
    .catch(done);
  });

  it('should parse article in publication.', done => {
    scrape.scrape({ url: urls.publicationArticle })
    .then(data => {
      log(data);
      done();
    })
    .catch(done);
  });

  it('should parse publication.', done => {
    scrape.scrape({ url: urls.publication })
    .then(data => {
      log(data);
      done();
    })
    .catch(done);
  });

});
