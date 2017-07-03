'use strict';

/* DEPENDENCIES */
const request = require('request-promise');
const cheerio = require('cheerio');

/* EXPORTS PARSER FUNCTION */
module.exports = function (link) {
  return new Promise((resolve, reject) => {
    request({
      url: link.url,
      jar: true,
      maxRedirects: 6
    })
    .then(body => {
      let $ = cheerio.load(body);
      let meta = {};
      /* TRY TO PARSE EACH PART */
      // TITLE
      let title = $('title');
      if (title.length) {
        meta.title = title[0].children[0].data;
      }
      // META TAGS
      let metaTags = $('meta');
      let attrs = [];
      for (let i = 0; i < metaTags.length; i++) {
        attrs.push(metaTags[i].attribs);
      }
      for (let attr of attrs) {
        if (attr.name === 'theme-color') meta.color = attr.content;
        switch (attr.property) {
          // COMMON METAS
          case 'description':
            meta.description = attr.content;
            break;
          // FACEBOOK OPEN GRAPH
          case 'og:title':
            meta.og = meta.og || {};
            meta.og.title = attr.content;
            break;
          case 'og:description':
            meta.og = meta.og || {};
            meta.og.description = attr.content;
            break;
          case 'og:url':
            meta.og = meta.og || {};
            meta.og.url = attr.content;
            break;
          case 'og:site_name':
            meta.og = meta.og || {};
            meta.og.site = attr.content;
            break;
          case 'og:type':
            meta.og = meta.og || {};
            meta.og.type = attr.content;
            break;
          case 'og:image':
            meta.og = meta.og || {};
            meta.og.image = attr.content;
            break;
          case 'og:image:url':
            if (!meta.og || (meta.og && !meta.og.image)) {
              meta.og = meta.og || {};
              meta.og.image = attr.content;
            }
            break;
          case 'og:image:secure_url':
            if (!meta.og || (meta.og && !meta.og.image)) {
              meta.og = meta.og || {};
              meta.og.image = attr.content;
            }
            break;
          case 'og:locale':
            meta.og = meta.og || {};
            meta.og.locale = attr.content;
            break;
          // TWITTER
          case 'twitter:title':
            meta.twitter = meta.twitter || {};
            meta.twitter.title = attr.content;
            break;
          case 'twitter:description':
            meta.twitter = meta.twitter || {};
            meta.twitter.description = attr.content;
            break;
          case 'twitter:url':
            meta.twitter = meta.twitter || {};
            meta.twitter.url = attr.content;
            break;
          case 'twitter:image':
            meta.twitter = meta.twitter || {};
            meta.twitter.image = attr.content;
            break;
          case 'twitter:image:alt':
            meta.twitter = meta.twitter || {};
            meta.twitter.imageAlt = attr.content;
            break;
        }
      }
      resolve({ meta });
    })
    .catch(error => {
      if (error.toString().indexOf('Invalid URI')) {
        return reject(Object.assign(new Error('Invalid url input.'), { status: 400 }));
      } else {
        return reject(error);
      }
    });
  });
};