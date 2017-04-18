'use strict';

/* DEPENDENCIES */
const request = require('request');
const config = require('./../config');

let base = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=';
let format = id => `${base}${id}&key=${config.google.key}`;

/* EXPORTS YOUTUBE SCRAPER FUNCTION */
module.exports = (link) => {
  return new Promise((resolve, reject) => {
    let id = getId(link.url);
    if (!id) return resolve();
    request(format(id), (error, res, body) => {
      if (error) return reject(error);
      try {
        body = JSON.parse(body);
      } catch (error) {
        return reject({ message: 'Error parsing youtube api response.', error });
      }
      if (body.error) return reject({ message: 'Youtube api error.', error: body.error });
      if (body.pageInfo && body.pageInfo.totalResults < 1 || !body.items.length) return reject({ code: 404 });

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
    });
  });
};

function getId(url) {
  let exp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;
  let match = url.match(exp);
  return (match && match.length ? match[1] : null);

  // For testing.
  // var urls = [
//     '//www.youtube-nocookie.com/embed/up_lNV-yoK4?rel=0',
//     'http://www.youtube.com/user/Scobleizer#p/u/1/1p3vcRhsYGo',
//     'http://www.youtube.com/watch?v=cKZDdG9FTKY&feature=channel',
//     'http://www.youtube.com/watch?v=yZ-K7nCVnBI&playnext_from=TL&videos=osPknwzXEas&feature=sub',
//     'http://www.youtube.com/ytscreeningroom?v=NRHVzbJVx8I',
//     'http://www.youtube.com/user/SilkRoadTheatre#p/a/u/2/6dwqZw0j_jY',
//     'http://youtu.be/6dwqZw0j_jY',
//     'http://www.youtube.com/watch?v=6dwqZw0j_jY&feature=youtu.be',
//     'http://youtu.be/afa-5HQHiAs',
//     'http://www.youtube.com/user/Scobleizer#p/u/1/1p3vcRhsYGo?rel=0',
//     'http://www.youtube.com/watch?v=cKZDdG9FTKY&feature=channel',
//     'http://www.youtube.com/watch?v=yZ-K7nCVnBI&playnext_from=TL&videos=osPknwzXEas&feature=sub',
//     'http://www.youtube.com/ytscreeningroom?v=NRHVzbJVx8I',
//     'http://www.youtube.com/embed/nas1rJpm7wY?rel=0',
//     'http://www.youtube.com/watch?v=peFZbP64dsU',
//     'http://youtube.com/v/dQw4w9WgXcQ?feature=youtube_gdata_player',
//     'http://youtube.com/vi/dQw4w9WgXcQ?feature=youtube_gdata_player',
//     'http://youtube.com/?v=dQw4w9WgXcQ&feature=youtube_gdata_player',
//     'http://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtube_gdata_player',
//     'http://youtube.com/?vi=dQw4w9WgXcQ&feature=youtube_gdata_player',
//     'http://youtube.com/watch?v=dQw4w9WgXcQ&feature=youtube_gdata_player',
//     'http://youtube.com/watch?vi=dQw4w9WgXcQ&feature=youtube_gdata_player',
//     'http://youtu.be/dQw4w9WgXcQ?feature=youtube_gdata_player'
  // ];

  // var i, r, rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

  // for (i = 0; i < urls.length; ++i) {
  //   r = urls[i].match(rx);
  //   console.log(r[1]);
  // }
};
