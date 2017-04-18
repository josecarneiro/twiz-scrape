'use strict';

let options = {
  testLink: true,
  testYoutube: true,
  testFacebook: true
};

/* TESTS */
describe('Scrape', () => {
  if (options.testLink) require('./link');
  // if (options.testYoutube) require('./youtube');
  // if (options.testFacebook) require('./facebook');
});
