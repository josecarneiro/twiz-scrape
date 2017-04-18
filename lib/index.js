'use strict';

// DEPENDENCIES
const Parser = require('./parser');
const Scraper = require('./scraper');

// EXPORTS SCRAPE CONTROLLER
function TwizScrape(config) {
  this.config = config;
};

TwizScrape.prototype.scrape = function(data) {
  return new Promise((resolve, reject) => {
    let url = data.url;
    let object = {};
    Parser(url)
    .then((parsed) => {
      object = parsed;
      if (parsed.service === 'youtube') {
        return Scraper.youtube(parsed);
      } else if (parsed.service === 'vimeo') {
        return Scraper.vimeo(parsed);
      } else {
        return Scraper.link(parsed);
      }
    })
    .then((doc) => {
      if (!doc) {
        delete object.service;
        return Scraper.link(object);
      } else {
        Object.assign(object, doc);
        return;
      }
    })
    .then((doc) => {
      if (doc) Object.assign(object, doc);
      if (this.config.debug) log(object);
      resolve(object)
    })
    .catch((error) => {
      reject(error);
    });
  })
};

const util = require('util');
let log = object => { console.log(util.inspect(object, { colors: true, depth: 4 })); };

module.exports = TwizScrape;
