'use strict';

module.exports = fw => {
    fw.use((req, res, next) => {
        res.success = (data, statusCode = 200) => {
            res.status(statusCode).json({
                status: 'success',
                statusCode: statusCode,
                payload: data || {}
            });
        }

        res.error = (data, statusCode = 500) => {
            res.status(statusCode).json({
                status: 'error',
                statusCode: statusCode,
                payload: data || {}
            });
        }

        res.notfound = message => {
            res.status(404).json({
                status: 'error',
                statusCode: 404,
                payload: {
                    error_message: message
                }
            });
        }

        next();
    });    
}