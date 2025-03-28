const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    };

    if (err.code === 11000) {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.msg = `Duplicate value entered for ${Object.keys(
            err.keyValue
        ).join(',')} field, please choose another value`;
    }

    if (err.name === 'ValidationError') {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',');
    }

    if (err.statusCode === 400) {
        customError.statusCode = 400;
        customError.msg = err.message;
    }

    if (err.name === 'CastError') {
        customError.msg = `No item found with id: ${err.value}`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    // return res.status(customError.statusCode).json({ err });
    return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
