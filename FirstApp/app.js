exports.handler = (event, context, callback) => {
  // callback(error, success)
  // This tells the lambda to response back to the client    
  console.log("Event", event);
  console.log("Context", context);
  console.log("callback", callback);
  callback(null, {
      statusCode: 200,
      body: JSON.stringify({
          message: 'Hello World Team'
      })
  });
};