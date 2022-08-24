const AWS = require('aws-sdk');
const sqs = new AWS.SQS({
    region: 'us-east-1'
});

exports.handler = function(event, context, callback) {
    const queueUrl = process.env.MyQueue;
    
    // SQS message parameters
    let params = {
        MessageBody: event.body,
        QueueUrl: queueUrl
    };
    
     // response and status of HTTP endpoint
    let responseBody = {
        message: ''
    };
    let responseCode = 200;

    sqs.sendMessage(params, function(err, data) {
        if (err) {
            console.log('error:', "failed to send message" + err);
            responseCode = 500;
        } else {
            console.log('data:', data.MessageId);
            responseBody.message = 'Sent to ' + queueUrl;
            responseBody.messageId = data.MessageId;
        }

        let response = {
            statusCode: responseCode,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(responseBody)
        };
        console.log("show response:",response)
        callback(null, response);
    });
}