const AWS = require("aws-sdk");
const { getBirthdayGift, getParams, getFormatData } = require("./utils");

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
  try {
    const data = JSON.parse(event.Records[0].body);
    const body = JSON.parse(data.Message);

    if (!body.dni) {
      throw new Error("Client dni required!");
    }

    const params = getParams(body.id);
    const client = await dynamodb.get(params).promise();

    if (!client.Item) {
      throw new Error("Client not found!");
    }

    const birthdayGift = getBirthdayGift(client.Item.birthday);
    const formatData = getFormatData(client, birthdayGift);
    await dynamodb.update(formatData).promise();

    const response = {
      statusCode: 200,
      body: "Updated Birthday Gift",
    };
    callback(null, response);
  } catch (e) {
    return e;
  }
};
