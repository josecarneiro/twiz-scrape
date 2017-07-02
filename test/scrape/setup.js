'use strict';

const TwizScrape = require('./../../.');
const config = require('./../config');
const scrape = new TwizScrape(Object.assign(config, { debug: true }));

module.exports = scrape;
