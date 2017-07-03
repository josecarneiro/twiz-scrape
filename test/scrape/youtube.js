'use strict';

/* DEPENDENCIES */
const expect = require('chai').expect;
const scrape = require('./setup');

const util = require('util');
let debug = true;
let log = object => { if (debug) console.log(util.inspect(object, { colors: true, depth: 4 })); };

/* TESTS */
describe('Youtube', () => {

  it('should parse youtube video url.', done => {
    let id = 'VbfpW0pbvaU';
    scrape.scrape({ url: `https://www.youtube.com/watch?v=${id}` })
    .then(data => {
      log(data);
      expect(data.service).to.equal('youtube');
      expect(data.data.id).to.equal(id);
      expect(data.meta.title).to.be.a('string');
      expect(data.meta.description).to.be.a('string');
      done();
    })
    .catch(done);
  });
});

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
