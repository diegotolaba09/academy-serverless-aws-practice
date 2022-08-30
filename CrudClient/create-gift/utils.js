const getParams = (id) => {
  const params = {
    Key: { id },
    TableName: process.env.CLIENT_TABLE,
  };
  return params;
};

const getBirthdayGift = (birthday) => {
  const birthdayArr = birthday.split("/");
  const season = getSeason(birthdayArr[1]);
  return {
    Otoño: "Buzo",
    Invierno: "Sweater",
    Primavera: "Camisa",
    Verano: "Remera",
  }[season];
};

const getSeason = (month) => {
  if (3 <= month && month <= 5) {
    return "Otoño";
  }

  if (6 <= month && month <= 8) {
    return "Invierno";
  }

  if (9 <= month && month <= 11) {
    return "Primavera";
  }
  return "Verano";
};

const getFormatData = (data, gift) => {
  const formatData = {
    TableName: process.env.CLIENT_TABLE,
    Key: { id: data.Item.id },
    ExpressionAttributeValues: {
      ":gift": gift,
    },
    UpdateExpression: "set gift = :gift",
    ReturnValues: "ALL_NEW",
  };
  
  return formatData;
};

module.exports = { getBirthdayGift, getParams, getFormatData };
