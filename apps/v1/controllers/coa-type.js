'use strict';

exports.index = (req, res, next) => {
    req.db.model('coa_type').findAll().then(data => {
        res.success(data);
    }).catch(next);
}

exports.create = (req, res, next) => {
    req.db.model('coa_type').create({
        ctype_name: req.body.ctype_name,
        ctype_position: req.body.ctype_position,
        ctype_closing: req.body.ctype_closing
    }).then(data => {
        res.success(data || {});
    }).catch(next);
}

exports.get = (req, res, next) => {
    req.db.model('coa_type').findOne({
        where: {
            ctype_id: req.params.coaTypeId
        }
    }).then(data => {
        if (!data) {
            res.notfound('Coa type is not found!');
        } else {
            req.coa_type = data;

            next();
        }
    }).catch(next)
}

exports.fetch = (req, res, next) => {
    res.success(req.coa_type);
}

exports.update = (req, res, next) => {
    req.coa_type.ctype_name = req.body.ctype_name;
    req.coa_type.ctype_position = req.body.ctype_position;
    req.coa_type.ctype_closing = req.body.ctype_closing;

    req.coa_type.save().then(data => {
        res.success(data);
    }).catch(next);
}

exports.delete = (req, res, next) => {
    req.coa_type.destroy().then(data => {
        res.success({ status: 'success' });
    }).catch(next);
}