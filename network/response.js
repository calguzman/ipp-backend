exports.success = function (req, res, message, status,data) {
  let statusCode = status || 500;
  let statusMessage = message || 'Not Defined';
  let dataBody = data || '[]';
  res.status(status).send({
      error: false,
      code: status,
      data:data,
      description: message,
  });
}

exports.error = function (error, req, res, status) {
  let statusCode = status || 500;
  let description = error || 'Internal server error';

  res.status(statusCode).send({
      error: true,
      code: status,
      description: description,
  });
}
