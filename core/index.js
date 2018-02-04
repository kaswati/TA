'use strict';

let core = fw => {
    let $initialize = false;
    
    // set framework options
    
    // set template engine
    
    // initialize database connection
    require('./db')(fw);

    // extend response
    require('./response.js')(fw);
    
    return {
        init: (rootpath, basepath) => {
            if ($initialize) {
                throw new Error('Application has been initialized!');
            }

            $initialize = true;

            // load  middlewares
            require('./middlewares.js')(fw);

            // load application
            let app = require(rootpath + '/' + basepath);

            // load core functions
            let fn = require('./functions.js')(fw, rootpath, basepath);

            app(fn);

            // non existing route
            fw.use((req, res, next) => {
                res.notfound('Page not found!');
            });
        }
    }
}

module.exports = core;