import { DynamoDBClient, PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";

const USERS_TABLE = process.env.USERS_TABLE || "Users";
const dynamoDb = new DynamoDBClient({ region: process.env.AWS_REGION || "us-east-1" });

export const createUser = async (user) => {
  const params = {
    TableName: USERS_TABLE,
    Item: {
      email: { S: user.email },
      userId: { S: user.userId },     
      password: { S: user.password },
      name: { S: user.name },
      profileImage: { S: user.profileImage || "" },
    },
  };
  await dynamoDb.send(new PutItemCommand(params));
};


export const findUserByEmail = async (email) => {
  const params = {
    TableName: USERS_TABLE,
    Key: { email: { S: email } },
  };

  const { Item } = await dynamoDb.send(new GetItemCommand(params));
  return Item ? {
    userId: Item.userId.S,
    email: Item.email.S,
    password: Item.password.S,
    name: Item.name.S,
    profileImage: Item.profileImage.S,
  } : null;
};
