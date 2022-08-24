'use strict';

const AWS = require('aws-sdk');
const sns = new AWS.SNS();

module.exports.addNote = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (typeof data.note !== 'number') {
    //Error in case ofnon number
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t add the note.',
    });
    return;
  }

  //Topic arn from env
  const params = {
    Message: data.note.toString() ,
    TopicArn: process.env.analyzeNote
    //TopicArn: example: `arn:aws:sns:us-east-1:$}:analyzeNote` config params from aws account,
  };

  sns.publish(params, (error) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t add the note due an internal error. Please try again later.',
      });
    }
    // create a resonse
    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully added the note.' }),
    };
    callback(null, response);
  });
};