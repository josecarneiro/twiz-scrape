'use strict';

// TODO:
// MAKE PARSE INTO STANDALONE LIBRARY
// THAT WAY, URLS CAN BE PARSED IN BUSINESS LOGIC
// AS WELL AS EXTERNAL SERVICES

/* DEPENDENCIES */
const url = require('url');

/* EXPORTS PARSER FUNCTION */
module.exports = class Parser {
  constructor (config) {
    this._config = config;
    this.services = config.services;
  }

  set services (services) {
    this._services = services;
    this._domains = {};
    for (let service in services) {
      if (services[service].domains) {
        for (let domain of services[service].domains) {
          this._domains[domain] = service;
        }
      }
    }
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
