const joi = require('joi')
joi.objectId = require('joi-objectid')(joi);

exports.checkIfValidId = function (id) {
    const joiSchema = joi.object({
        id: joi.objectId().required()
    }).options({ abortEarly: false });

    return joiSchema.validate(id);
}

exports.changePasswordUserValidation = function (input) {
    const joiSchema = joi.object({
        currentPassword: joi.string().required(),
        newPassword: joi.string().required().min(6).max(255),
    }).options({ abortEarly: false });

    return joiSchema.validate(input);
}