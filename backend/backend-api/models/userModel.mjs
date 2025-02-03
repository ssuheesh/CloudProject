import { DynamoDBClient, PutItemCommand, GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const USERS_TABLE = process.env.USERS_TABLE || "Users";
const dynamoDb = new DynamoDBClient({ region: process.env.AWS_REGION || "us-east-1" ,maxRetries: 3,
httpOptions: {
    timeout: 5000,
    connectTimeout: 5000
}});

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

export const updateUser = async (email, updatedData) => {
    const params = {
      TableName: 'Users',
      Key: { email: { S: email } },  
      UpdateExpression: 'SET #profileImage = :profileImage', 
      ExpressionAttributeNames: { '#profileImage': 'profileImage' },
      ExpressionAttributeValues: { ':profileImage': { S: updatedData.profileImage } },
      ReturnValues: 'ALL_NEW',  
    };
  
    try {
      const result = await dynamoDb.send(new UpdateItemCommand(params));
      return result.Attributes; 
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  };