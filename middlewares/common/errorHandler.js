const createError = require('http-errors');

function notFoundHandler(req, res, next) {
    next(createError(404, "Your requested content was not found!"));
}

// default error handler
function errorHandler(err, req, res, next) {
    //html response as below
    // res.render('error', {
    //     title: "Error page",
    // }); 
    // error.ejs file name

    // or use can use as below
    // res.locals.title = "Error Page"
    // res.render("error")

    // final code
    res.locals.error = process.env.NODE_ENV === "development" ? err : { massage: err.massage};

    res.status(err.status || 500);

    if(res.locals.html) {
        //html response
        res.render("error", {
            title: "Error page",
        });
    } else {
        //json response
        res.json(err);
    }
}

module.exports = {
    notFoundHandler,
    errorHandler,
}