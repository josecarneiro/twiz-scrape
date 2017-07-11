'use strict';

const { resolve } = require('path');
const TwizScrape = require('./../../.');
const config = require('./../config');
const services = [
  {
    name: 'youtube',
    data: config.google,
    path: resolve(__dirname, './../../services/youtube')
  }
  // 'medium'
];
const options = Object.assign(config, { debug: true }, { services });

const scrape = new TwizScrape(options);

module.exports = scrape;
