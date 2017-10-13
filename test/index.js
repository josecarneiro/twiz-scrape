'use strict';

/* DEPENDENCIES */
const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, './config/test.env') });

describe('Application Tests', () => {
  require('./scrape');
});
