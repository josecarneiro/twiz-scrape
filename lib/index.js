'use strict';

// DEPENDENCIES
const util = require('util');
const request = require('request-promise');

const Parser = require('./parser');
const Scraper = require('./scraper');

const pkg = require('./../package.json');
const version = pkg.version;

let log = object => { console.log(util.inspect(object, { colors: true, depth: 4 })); };

// EXPORTS SCRAPE CONTROLLER
class TwizScrape {
  constructor (config) {
    this._config = Object.assign(config);
    this._version = version;

    this.request = request;

    this._services = {};

    this.setServices(config.services);

    this.parser = new Parser(this._config, this._services);
    this.scraper = new Scraper(this._config, this._services);
  }

  get version () {
    return this._version;
  }

  static version () {
    return version;
  }

  setServices (services) {
    this._services = { link: new (require('./../services/link'))(this) };
    for (let service of services) {
      const dependencies = pkg.dependencies;
      let name, path;
      if (typeof service === 'string') {
        name = service;
      } else if (service.name && typeof service.name === 'string') {
        name = service.name;
      } else {
        throw new Error('Misconfiguration');
      }

      for (let dependency in dependencies) {
        if (dependency.indexOf(`scrape-service-${name}`) > -1) {
          path = dependency;
        }
      }

      if (!path) path = service.path || `./../services/${name}`;
      
      this._services[name] = new (require(path))(this, service.data || {});
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

module.exports = TwizScrape;
