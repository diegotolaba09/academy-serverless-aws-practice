'use strict';

exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Event success!',
      input: event,
    }),
  };

  console.log('event: ',JSON.stringify(event));

  var body = event.Records[0].body;
  console.log("text: ",JSON.parse(body).text);

  callback(null, response);
};
