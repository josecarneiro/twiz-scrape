'use strict';

/* DEPENDENCIES */
const url = require('url');

/* EXPORTS PARSER FUNCTION */
module.exports = class Parser {
  constructor (config, services) {
    this._config = config;
    this._domains = {};
    this._services = {};
    this.services = services;
    // console.log(this._domains);
  }

  set services (services) {
    this._services = services;
    for (let service in services) {
      if (services[service].domains) {
        for (let domain of services[service].domains) {
          this._domains[domain] = service;
        }
      }
    }
  }

  get services () {
    return this._services;
  }

  parse (string) {
    return new Promise((resolve, reject) => {
      let link = url.parse(string);
      let parsed = { url: string };
      if (this._domains[link.hostname]) {
        parsed.service = this._domains[link.hostname];
      }
      if (parsed.service && this._services[parsed.service].parser) {
        parsed.serviceData = this._services[parsed.service].parser(link);
      }
      resolve(parsed);
    });
  }
};
