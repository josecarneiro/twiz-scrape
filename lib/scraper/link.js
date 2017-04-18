'use strict';

/* DEPENDENCIES */
const request = require('request');
const cheerio = require('cheerio');

/* EXPORTS PARSER FUNCTION */
module.exports = (link) => {
  return new Promise((resolve, reject) => {
    // console.log(link);
    request({
      url: link.url,
      jar: true,
      maxRedirects: 6
    }, (error, res, body) => {
      if (error) {
        if (error.toString().indexOf('Invalid URI')) {
          let err = new Error('Invalid url input.');
          err.status = 400;
          return reject(err);
        } else {
          return reject(error);
        }
      };
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
      for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i];
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
      // console.log(attrs);
      resolve({ meta });
    });
  });
};
