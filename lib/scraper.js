'use strict';

/* EXPORTS */
module.exports = class Scraper {
  constructor (config, services) {
    this._config = config;
    this._services = services;
    for (let service in this._services) {
      this[service] = function (data) {
        return this._services[service].scraper(data);
      };
    }
  };

  get config () {
    return this._config;
  }
};
