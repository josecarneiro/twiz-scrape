'use strict';

// DEPENDENCIES
const util = require('util');

const Parser = require('./parser');
const Scraper = require('./scraper');

const version = require('./../package.json').version;

let log = object => { console.log(util.inspect(object, { colors: true, depth: 4 })); };

// EXPORTS SCRAPE CONTROLLER
const TwizScrape = class {
  constructor(config) {
    this._config = config;
    this._version = version;
    this.parser = new Parser(this._config);
    this.scraper = new Scraper(this._config);
  }

  get version () {
    return this._version;
  }

  static version () {
    return version;
  }
  
  scrape (data) {
    return new Promise((resolve, reject) => {
      let url = data.url;
      let object = {};
      this.parser
      .parse(url)
      .then(parsed => {
        object = parsed;
        return this.scraper[parsed.service || 'link'](parsed);
      })
      .then(doc => {
        if (!doc) {
          delete object.service;
          return this.scraper.link(object);
        } else {
          Object.assign(object, doc);
          return;
        }
      })
      .then(document => {
        if (document) Object.assign(object, document);
        if (this._config.debug) log(object);
        resolve(object)
      })
      .catch(reject);
    })
  }
};

module.exports = TwizScrape;
