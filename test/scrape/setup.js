'use strict';

const Scrape = require('./../../.');
const ScrapeYoutube = require('./../../../scrape-services/scrape-service-youtube');
const config = require('./../config');

const options = Object.assign(config, { debug: true });

module.exports = new Scrape([
  new ScrapeYoutube({
    key: config.google.key
  })
], options);
