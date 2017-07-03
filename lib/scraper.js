'use strict';

/* EXPORTS */
module.exports = class Scraper {
  constructor (config) {
    this._config = config;
    for (let service in this._config.services) {
      this[service] = function (data) {
        return this._config.services[service].scraper.bind(this)(data);
      };
    }
  };

  get config () {
    return this._config;
  }
};
