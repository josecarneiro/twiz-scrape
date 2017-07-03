'use strict';

/* DEPENDENCIES */
const request = require('request-promise');

let base = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=';
let format = (id, key) => `${base}${id}&key=${key}`;

/* EXPORTS YOUTUBE SCRAPER FUNCTION */
module.exports = function (link) {
  return new Promise((resolve, reject) => {
    let id = link.serviceData.id;
    if (!id) return resolve();
    request(format(id, this.config.google.key))
    .then(body => {
      try {
        body = JSON.parse(body);
      } catch (error) {
        return reject(Object.assign(error, { message: 'Error parsing youtube api response.' }));
      }
      if (body.error) return reject(Object.assign(body.error, { message: 'Youtube api error.' }));
      if ((body.pageInfo && body.pageInfo.totalResults < 1) || !body.items.length) return reject(Object.assign(new Error(), { code: 404 }));
      let data = {};
      let meta = {};
      /* WRITE VIDEO META DATA INTO DATA OBJECT */
      if (body.items[0].id) data.id = body.items[0].id;

      let snippet = body.items[0].snippet;

      if (snippet.title) {
        data.title = snippet.title;
        meta.title = snippet.title;
      };
      if (snippet.description) {
        data.description = snippet.description;
        meta.description = snippet.description;
      };
      if (snippet.publishedAt) data.date = new Date(snippet.publishedAt);
      if (snippet.channelId) data.channel = snippet.channelId;

      // THUMBNAILS
      if (snippet.thumbnails) {
        if (snippet.thumbnails.maxres) {
          data.thumbnail = snippet.thumbnails.maxres.url;
        } else if (snippet.thumbnails.high) {
          data.thumbnail = snippet.thumbnails.high.url;
        } else if (snippet.thumbnails.medium) {
          data.thumbnail = snippet.thumbnails.medium.url;
        } else if (snippet.thumbnails.standard) {
          data.thumbnail = snippet.thumbnails.standard.url;
        } else if (snippet.thumbnails.default) {
          data.thumbnail = snippet.thumbnails.default.url;
        }
        meta.thumbnails = [];
        for (let size in snippet.thumbnails) {
          meta.thumbnails.push(snippet.thumbnails[size].url);
        }
        meta.thumbnails.reverse();
      }
      resolve({ data, meta });
    })
    .catch(reject);
  });
};
