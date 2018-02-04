'use strict';

module.exports = (app, router) => {
    const MainController = app.controller('main');

    router.use('/coa-types', app.route('coa-type'));

    router.get('/', MainController.index);
};