'use strict';

const Scrape = require('./../../.');
const config = require('./../config');
const scrape = new Scrape(Object.assign(config, { debug: true }));

module.exports = scrape;
