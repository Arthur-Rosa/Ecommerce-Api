const {
    validationResult
} = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }

    const extractErrors = [];

    errors.array().map((e) => {
        extractErrors.push(e.msg);
    });
    return res.status(422).json({
        errors: extractErrors
    })
}

module.exports = validate;