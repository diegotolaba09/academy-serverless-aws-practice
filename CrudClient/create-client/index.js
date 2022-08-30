const AWS = require("aws-sdk");
const { validationData, getParams } = require("./utils");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();

exports.handler = async (event, context, callback) => {
  try {
    const body = JSON.parse(event.body);
    const data = validationData(body);
    const params = getParams(data);
    await dynamodb.put(params).promise();

    await sns
      .publish({
        Message: JSON.stringify(params.Item),
        TopicArn: process.env.topicClient,
      })
      .promise();

    const response = {
      statusCode: 200,
      body: "Created!",
    };
    callback(null, response);
  } catch (e) {
    return {
      statusCode: 400,
      message: `${e}`,
    };
  }
};
