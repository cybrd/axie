import * as AWS from "aws-sdk";

export const dynamodb = new AWS.DynamoDB();

export const docClient = new AWS.DynamoDB.DocumentClient();
