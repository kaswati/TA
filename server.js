'use strict';

require('dotenv').config();

// set application environment
global.ENV = process.env.NODE_ENV || 'development';
global.async = require('async');
//bluebird package
global.bluebird = require("bluebird");

const port = process.env.PORT || 3000;
const express = require('express');
const fw = express();
const core = require('./core')(fw, __dirname);

core.init(__dirname, 'apps/v1');

fw.listen(port);

module.exports = fw
