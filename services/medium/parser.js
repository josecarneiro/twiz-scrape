'use strict';

// DEPENDENCIES
const url = require('url');

// PARSING FUNCTION FOR MEDIUM SERVICE
module.exports = link => {
  let parsed = {};
  let path = url.parse(link.href).pathname.split('/');
  if (path[1].indexOf('@') === 0) {
    parsed.author = path[1];
  } else {
    parsed.publication = path[1];
  }
  if (path[2]) parsed.id = path[2];
  return parsed;
};
