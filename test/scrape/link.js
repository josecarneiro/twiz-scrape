'use strict';

/* DEPENDENCIES */
const { expect } = require('chai');
const scrape = require('./setup');

let urlList = {
  google: 'https://google.com',
  youtube: 'http://youtube.com',
  nytimes: 'https://www.nytimes.com/2017/02/28/world/middleeast/united-nations-security-council-syria-sanctions-russia-trump.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=first-column-region&region=top-news&WT.nav=top-news&_r=0',
  bbc: 'http://www.bbc.com/news/av/world-asia-china-40073960/alphago-computer-defeat-painful-for-chinese-go-prodigy'
};

/* TESTS */
describe('Link', () => {

  it('should parse google', done => {
    scrape
    .scrape({ url: urlList.google })
    .then(data => {
      done();
    })
    .catch(done);
  });

  it('should parse non-video youtube url as regular link.', done => {
    scrape
    .scrape({ url: urlList.youtube })
    .then(data => {
      expect(data.service).to.be.undefined;
      done();
    })
    .catch(done);
  });

  it('should parse dribbble url.', done => {
    scrape.scrape({ url: 'http://dribbble.com/shots/3312757--Gamescovery' })
    .then(data => {
      expect(data.service).to.be.undefined;
      done();
    })
    .catch(done);
  });

  it('should parse NYTimes url.', done => {
    scrape.scrape({ url: urlList.nytimes })
    .then(data => {
      expect(data.service).to.be.undefined;
      done();
    })
    .catch(done);
  });

  it('should parse BBC url.', done => {
    scrape.scrape({ url: urlList.bbc })
    .then(data => {
      expect(data.service).to.be.undefined;
      done();
    })
    .catch(done);
  });

});
