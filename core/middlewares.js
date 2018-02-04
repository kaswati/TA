'use strict';

let loadMiddlewares = app => {
    let bodyParser = require('body-parser');
    
    // body parser for json-encoded
    app.use(bodyParser.json({
        // maximum request body size
        // use https://www.npmjs.com/package/bytes as reference for defining byte calculation
        limit: '100kb'
    }));

    // body parser for url-encoded
    app.use(bodyParser.urlencoded({
        limit: '100kb',
        // parsing the URL-encoded data with the querystring library (false) or qs library (true)
        extended: false
    }));

    if (ENV !== 'production') {
        // for environment other than production
        let morgan = require('morgan');

        app.use(morgan('dev'));
    } else {
        // for environment only on production        
    }
}

module.exports = loadMiddlewares;