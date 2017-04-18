'use strict';

/* DEPENDENCIES */
const url = require('url');

/* EXPORTS PARSER FUNCTION */
module.exports = (string) => {
  return new Promise((resolve, reject) => {
    let link = url.parse(string);
    let parsed = { url: string };
    // console.log(link);
    switch (link.hostname) {
      case 'youtube.com':
        parsed.service = 'youtube';
        break;
      case 'www.youtube.com':
        parsed.service = 'youtube';
        break;
      case 'youtu.be':
        parsed.service = 'youtube';
        break;
      case 'vimeo.com':
        parsed.service = 'vimeo';
        parsed.id = link.pathname.replace('/', '');
        break;
      case 'player.vimeo.com':
        parsed.service = 'vimeo';
        parsed.id = link.pathname.replace('/video/', '');
        break;
    }
    // if (parsed.id) console.log(parsed.id);
    // if (string.indexOf('youtube') > -1) parsed.service = 'youtube';
    // if (string.indexOf('vimeo') > -1) parsed.service = 'youtube';
    // console.log(parsed);
    resolve(parsed);
  });
};
