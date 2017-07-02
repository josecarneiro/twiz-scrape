'use strict';

/* DEPENDENCIES */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './config/test.env') });

describe('Application Tests', () => {
  require('./scrape');
});
