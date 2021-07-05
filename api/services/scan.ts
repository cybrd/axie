import { docClient } from "../../config";

export const scan = async () => {
  try {
    return docClient.scan({ TableName: "axie" }).promise();
  } catch (err) {
    console.error(err);
  }
};
