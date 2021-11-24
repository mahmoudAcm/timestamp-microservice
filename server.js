const express = require('express');
const { StatusCodes } = require('http-status-codes');

const PORT = process.env.PORT || 3000;

const app = express();

/**
 * @param input {string | number}
 */
const DateToObject = (input) => {
  const date = new Date(input);
  return {
    unix: date.getTime(),
    utc: date.toUTCString(),
  };
};

app.get(
  '/api/timestamp/:input',
  (requset, response) => {
    let responseObject = {};
    const { input } = requset.params;
    if (input.includes('-')) {
      responseObject = DateToObject(input);
    } else {
      responseObject = DateToObject(parseInt(input));
    }

    if (!responseObject.unix || !responseObject.utc) throw Error();

    response.json(responseObject);
  },
  (error, request, response, next) => {
    response.status(StatusCodes.BAD_REQUEST).json({
      message: 'Invalid Date',
    });
  },
);

app.get('/api/timestamp', (request, response) => {
  response.json({
    unix: Date.now(),
    utc: new Date().toUTCString(),
  });
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
