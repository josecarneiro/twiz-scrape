'use strict';

require('dotenv').config({ path: './../config/test.env' });

let options = {
  testLink: true,
  testYoutube: true,
  testMedium: true,
  testFacebook: true,
  testMultiple: true
};

/* TESTS */
describe('Scrape', () => {
  if (options.testLink) require('./link');
  if (options.testYoutube) require('./youtube');
  if (options.testMedium) require('./medium');
  if (options.testFacebook) require('./facebook');
  // if (options.testMultiple) require('./multiple-links');
});
