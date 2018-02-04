'use strict';

module.exports = (app, route) => {
    const CoaTypeController = app.controller('coa-type');

    route.get('/', CoaTypeController.index);
    route.post('/', CoaTypeController.create);
    route.get('/:coaTypeId', CoaTypeController.fetch);
    route.put('/:coaTypeId', CoaTypeController.update);
    route.delete('/:coaTypeId', CoaTypeController.delete);
    route.param('coaTypeId', CoaTypeController.get);
}