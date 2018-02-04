'use strict';

let fn = (fw, rootpath, basepath) => {
    const path = require('path')
    const fn = {}

    // set main router
    fn.router = param => {
        const router = require('express').Router();
        
        param(fn, router);
        
        fw.use(router);
    }
    
    // require a route file
    fn.route = routeName => {
        let callback = require(path.normalize(rootpath + '/' + basepath + '/routes/' + routeName.toLowerCase() + '.js'));

        const router = require('express').Router();

        callback(fn, router);

        return router;
    }

    // require a filter file
    fn.filter = filterName => {
        return require(path.normalize(rootpath + '/' + basepath + '/filters/' + filterName.toLowerCase() + '.js'));
    }

    // require a controller file
    fn.controller = controllerName => {
        return require(path.normalize(rootpath + '/' + basepath + '/controllers/' + controllerName.toLowerCase() + '.js'));
    }

    fw.request.db = fw.db;

    return fn;
}

module.exports = fn;
