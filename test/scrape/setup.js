'use strict';

const Scrape = require('./../../.');
const ScrapeYoutube = require('./../../lib/services/youtube');
const config = require('./../config');

const options = Object.assign(config, { debug: true });

module.exports = new Scrape(options, [
  new ScrapeYoutube({
    key: config.key
  })
]);
