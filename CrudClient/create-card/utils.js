const MIN_CODE = 100;
const MAX_CODE = 999;

const getParams = (id) => {
  const params = {
    Key: { id },
    TableName: process.env.CLIENT_TABLE,
  };
  return params;
};

const getFormatData = (data) => {
  const formatData = {
    TableName: process.env.CLIENT_TABLE,
    Key: { id: data.id },
    ExpressionAttributeValues: {
      ":cardType": data.cardType,
      ":expiration": data.expiration,
      ":code": data.code,
    },
    UpdateExpression:
      "set cardType = :cardType, expiration = :expiration, code = :code",
    ReturnValues: "ALL_NEW",
  };

  return formatData;
};

const getAge = (birthday) => {
  const birthdayArr = birthday.split("/");
  const birthdayDate = new Date(
    birthdayArr[2],
    birthdayArr[1] - 1,
    birthdayArr[0]
  );
  const ageDifMs = Date.now() - birthdayDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const generateCode = () => {
  return Math.floor(Math.random() * (MAX_CODE - MIN_CODE) + MIN_CODE);
};

const getExpiration = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 5);
  const result = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  return result;
};

module.exports = {
  getParams,
  getAge,
  getFormatData,
  generateCode,
  getExpiration,
};
