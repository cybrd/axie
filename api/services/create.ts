import { dynamodb } from "../../config";

export const create = async () => {
  try {
    const results = await dynamodb.listTables().promise();
    console.log(results);
  } catch (err) {
    console.error(err);
  }
};
