'use strict';

/* EXPORTS */
module.exports = class Scraper {
  constructor (config) {
    this._config = config;
    const services = [ 'link', 'youtube', 'vimeo' ];
    
    for (let service of services) {
      this[service] = function (data) {
        return require('./' + service).bind(this)(data);
      };
    }
  };

  get config () {
    return this._config;
  }
};
