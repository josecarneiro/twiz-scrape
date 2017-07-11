'use strict';

/* DEPENDENCIES */
const cheerio = require('cheerio');

/* EXPORTS PARSER FUNCTION */
module.exports = function (link) {
  return new Promise((resolve, reject) => {
    this.request({
      url: link.url,
      jar: true,
      maxRedirects: 6
    })
    .then(body => {
      let $ = cheerio.load(body);
      let meta = {};

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

        switch (attr.name) {
          case 'description':
            meta.description = attr.content;
            break;
          case 'theme-color':
            meta.color = attr.content;
            break;
        };

        switch (attr.property) {

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
          case 'twitter:image:src':
            if (!meta.twitter || (meta.twitter && !meta.twitter.image)) {
              meta.twitter = meta.twitter || {};
              meta.twitter.image = attr.content;
            }
            break;
          case 'twitter:image:alt':
            meta.twitter = meta.twitter || {};
            meta.twitter.imageAlt = attr.content;
            break;

          // APP
          case 'al:ios:app_name':
            meta.app = meta.app || {};
            meta.app.ios = meta.app.ios || {};
            meta.app.ios.name = attr.content;
            break;
          case 'al:ios:url':
            meta.app = meta.app || {};
            meta.app.ios = meta.app.ios || {};
            meta.app.ios.url = attr.content;
            break;
          case 'al:android:app_name':
            meta.app = meta.app || {};
            meta.app.android = meta.app.android || {};
            meta.app.android.name = attr.content;
            break;
          case 'al:android:url':
            meta.app = meta.app || {};
            meta.app.android = meta.app.android || {};
            meta.app.android.url = attr.content;
            break;
        }
      }

      // LINKS
      let links = $('link');
      let list = [];
      for (let i = 0; i < links.length; i++) {
        list.push(links[i].attribs);
      }

      for (let link of list) {
        switch (link.rel) {
          case 'canonical':
            meta.canonical = link.href;
            break;
        }
      }

      // IMAGES
      // let images = $('img');
      // for (let i = 0; i < images.length; i++) {
      //   console.log(images[i].attribs);
      // }
      
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
