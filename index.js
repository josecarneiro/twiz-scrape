'use strict';

// DEPENDENCIES
const { version } = require('./package.json');
const { inspect } = require('util');
const { parse } = require('url');

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
  constructor (services, options) {
    super(options);

    this._services = [];

    this.services = services;

    this._defaultService = null;
  }

  set services (services) {
    for (let service of services) {
      let values = service.install(this, this._config);
      this._services.push(service);
    }
  }
  
  scrape (data) {
    return new Promise((resolve, reject) => {
      let url = typeof data === 'string' ? data : data.url;

      let parsed = this._parse(url);
      let object = { parsed };

      const service = this._chooseService(parsed.domain);

      service.scrape(parsed)
      .then(document => {
        // IF SERVICE DIDN'T MANAGE, PASS TO DEFAULT LINK SERVICE
        if (!document) return this._defaultService(parsed);
        object.document = document;
        return Promise.resolve();
      })
      .then(document => {
        if (document) object.document = document;
        if (this._options.debug) log(object);
        resolve(object);
      })
      .catch(reject);
    });
  }

  _chooseService (domain) {
    for (let service of this._services) {
      if (service.domains.includes(domain)) {
        return service;
      }
    }
    return this._services[this._services.length - 1];
  }

  _parse (url) {
    let link = parse(url);
    return {
      url,
      domain: link.hostname,
      ...link
    };
  }
};

module.exports = Scrape;
