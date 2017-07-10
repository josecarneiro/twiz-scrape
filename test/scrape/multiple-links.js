'use strict';

/* DEPENDENCIES */
// const expect = require('chai').expect;
const scrape = require('./setup');

let urlList = [
  'https://google.com',
  'http://youtube.com',
  'https://www.nytimes.com/2017/02/28/world/middleeast/united-nations-security-council-syria-sanctions-russia-trump.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=first-column-region&region=top-news&WT.nav=top-news&_r=0',
  'http://www.bbc.com/news/av/world-asia-china-40073960/alphago-computer-defeat-painful-for-chinese-go-prodigy'
];

/* TESTS */
describe('Link', () => {

  let scrapes = [];

  for (let url of urlList) {
    scrapes.push(scrape.scrape({ url }));
  };

  it('should parse diverse list of links', done => {
    Promise.all(scrapes)
    .then(() => done())
    .catch(done);
  });

});
