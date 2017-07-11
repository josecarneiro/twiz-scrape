'use strict';

module.exports = class Youtube {
  constructor (instance, config) {
    this._instance = instance;
    this._config = config;

    this.request = this._instance.request;
    
    this._domains = [ 'youtube.com', 'www.youtube.com', 'youtu.be' ];
  }

  parser (link) {
    return require('./parser')(link);
  }

  scraper (link) {
    return new Promise((resolve, reject) => {
      require('./scraper').bind(this)(link)
      .then(resolve)
      .catch(reject);
    });
  }

  get domains () {
    return this._domains;
  }
};
