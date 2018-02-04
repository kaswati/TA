'use strict';

require('dotenv').config();

// set application environment
global.ENV = process.env.NODE_ENV || 'development';

const port = process.env.PORT || 3000;
const express = require('express');
const fw = express();
const core = require('./core')(fw);

core.init(__dirname, 'apps/v1');

fw.listen(port);

module.exports = fw
