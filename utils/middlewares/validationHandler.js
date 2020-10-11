// const Joi = require('@hapi/joi');
const Joi = require('joi');
const boom = require('boom');

function validate(schema, data) {
  const {error} = schema.validate(data);
  return error;
}

function validationHandler(schema, check="body") {
  return function (req, res, next) {   
    const error = validate(schema, req[check]);
    error ? next(boom.badRequest(error)) : next();
  }
}
module.exports = validationHandler;
