'use strict';

module.exports = (app, router) => {
    const MainController = app.controller('main');

    //router.use('/example', app.route('example'));
    router.get('/', MainController.index);
};