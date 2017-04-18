'use strict';

/* DEPENDENCIES */
const expect = require('chai').expect;
const config = require('./../config');
const scrape = require('./setup');

let urlList = {
  google: 'https://google.com',
  youtube: 'http://youtube.com',
  nytimes: 'https://www.nytimes.com/2017/02/28/world/middleeast/united-nations-security-council-syria-sanctions-russia-trump.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=first-column-region&region=top-news&WT.nav=top-news&_r=0',
  bbc: 'http://www.bbc.com/news/world-us-canada-39119089'
};

/* TESTS */
describe('Link', () => {

  it('should parse google', (done) => {
    scrape.scrape({ url: urlList.google })
    .then((res) => {
      done();
    })
    .catch(error => done(error));
  });

  it('should parse non-video youtube url as regular link.', (done) => {
    scrape.scrape({ url: urlList.youtube })
    .then((data) => {
      expect(data.service).to.be.undefined;
      done();
    })
    .catch(error => done(error));
  });

  it('should parse dribbble url.', (done) => {
    scrape.scrape({ url: 'http://dribbble.com/shots/3312757--Gamescovery' })
    .then((data) => {
      expect(data.service).to.be.undefined;
      done();
    })
    .catch(error => done(error));
  });

  it('should parse NYTimes url.', (done) => {
    scrape.scrape({ url: urlList.nytimes })
    .then((data) => {
      expect(data.service).to.be.undefined;
      done();
    })
    .catch(error => done(error));
  });

  it('should parse BBC url.', (done) => {
    scrape.scrape({ url: urlList.bbc })
    .then((data) => {
      expect(data.service).to.be.undefined;
      done();
    })
    .catch(error => done(error));
  });

});
