module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}
/*
This module is a wrapper for async functions. It will catch any errors and pass them along to the next function.
*/ 