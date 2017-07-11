'use strict';

module.exports = class Link {
  constructor (instance, config) {
    this._instance = instance;
    this._config = config;

    this.request = this._instance.request;
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
