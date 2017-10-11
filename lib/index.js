'use strict';

// DEPENDENCIES
const { version } = require('./../package.json');
const { inspect } = require('util');

const Parser = require('./parser');
const Scraper = require('./scraper');

let log = object => { console.log(inspect(object, { colors: true, depth: 4 })); };

class Base {
  constructor (options) {
    this._version = version;
    this._defaults = {
      prop: 'foo'
    };
    this.options = options;
  }

  set options (options) {
    this._options = Object.assign(this._defaults, options);
  }

  get options () {
    return this._options;
  }

  get version () {
    return this._version;
  }

  static version () {
    return version;
  }
};

// EXPORTS SCRAPE CONTROLLER
class Scrape extends Base {
  constructor (...args) {
    super();
    this._config = Object.assign(config);

    this._services = {};

    const services = [];

    for (const service of args) {
      if (typeof service.install !== 'undefined') {
        services.push(service);
      }
    }

    this.setServices(services);

    this.parser = new Parser(this._config, this._services);
    this.scraper = new Scraper(this._config, this._services);
  }

  setServices (services) {
    for (let service of services) {
      let values = service.install(this, this._config);
      this._services[values.name] = service;
    }
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
      .then(document => {
        if (document) {
          Object.assign(object, document);
          return Promise.resolve();
        } else {
          delete object.service;
          return this.scraper.link(object);
        }
      })
      .then(document => {
        if (document) Object.assign(object, document);
        if (this._config.debug) log(object);
        resolve(object);
      })
      .catch(reject);
    });
  }
};

module.exports = Scrape;
