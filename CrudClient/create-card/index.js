const AWS = require("aws-sdk");
const {
  getParams,
  getAge,
  getFormatData,
  generateCode,
  getExpiration,
} = require("./utils");

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

    const age = getAge(client.Item.birthday);
    let cardType = "Classic";

    if (age > 45) {
      cardType = "Gold";
    }

    const dataClient = {
      ...client.Item,
      cardType: cardType,
      expiration: getExpiration(),
      code: generateCode(),
    };

    const formatData = getFormatData(dataClient);

    await dynamodb.update(formatData).promise();

    const response = {
      statusCode: 200,
      body: "Updated!",
    };
    callback(null, response);
  } catch (e) {
    return {
      statusCode: 400,
      message: `${e}`,
    };
  }
};
