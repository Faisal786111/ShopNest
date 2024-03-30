const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    console.log(error);
    res.status(404);
    return next(error);
}

const errorHandler = (err, req, res, next) => {
    let statusCode = err.status || 500;
    let message = err.message || 'Internal Server Error';

    // Check for specific error conditions and update status code and message accordingly
    if (err.name === "CastError" && err.kind === "ObjectId") {
        message = "Resource not found.";
        statusCode = 404;
    }

    return res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? "🎂" : err.stack,
    });
}


module.exports = { notFound, errorHandler };