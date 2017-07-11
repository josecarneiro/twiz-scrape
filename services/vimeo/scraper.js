'use strict';

/* DEPENDENCIES */
const request = require('request-promise');

let base = 'https://api.vimeo.com/videos/';
let format = (id, key) => `${base}${id}?access_token=${key}`;

/* EXPORTS YOUTUBE SCRAPER FUNCTION */
module.exports = function (link) {
  return new Promise((resolve, reject) => {
    let id = link.id;
    if (!id) return resolve();
    request(format(id, this._config.vimeo.key))
    .then(body => {
      try {
        body = JSON.parse(body);
      } catch (error) {
        return reject({ message: 'Error parsing vimeo api response.', error });
      }
      if (body.error) return reject({ message: 'Vimeo api error.', error: body.error });
      let data = {
        id
      };
      let meta = {};
      /* WRITE VIDEO META DATA INTO DATA OBJECT */

      if (body.name) {
        data.title = body.name;
        meta.title = body.name;
      };
      if (body.description) {
        data.description = body.description;
        meta.description = body.description;
      };
      if (body.release_time) data.date = new Date(body.release_time);
      if (body.user && body.user.uri) data.channel = body.user.uri.replace('/users/', '');

      // THUMBNAILS
      if (body.pictures) {
        meta.thumbnails = [];
        if (body.pictures.sizes.length) {
          data.thumbnail = body.pictures.sizes[body.pictures.sizes.length - 1].link;
          for (let size of body.pictures.sizes) {
            meta.thumbnails.push(size.link);
          }
          meta.thumbnails.reverse();
        } else {
          data.thumbnail = body.pictures.uri;
          meta.thumbnails.push(body.pictures.uri);
        }
      }

      resolve({ data, meta });
    })
    .catch(reject);
  });
};
