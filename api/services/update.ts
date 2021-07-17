import { docClient } from "../../config";

export const update = (body: any[]) => {
  const promises: Promise<any>[] = [];

  for (const data of body) {
    try {
      const id = data.id;
      delete data.id;

      const updateExpressionArr: string[] = [];
      const ExpressionAttributeNames = {};
      const ExpressionAttributeValues = {};
      for (const prop in data) {
        updateExpressionArr.push(`#${prop} = :${prop}`);
        ExpressionAttributeNames["#" + prop] = prop;
        ExpressionAttributeValues[":" + prop] = data[prop];
      }
      const UpdateExpression = "set " + updateExpressionArr.join(", ");

      promises.push(
        docClient
          .update({
            TableName: "axie",
            Key: {
              id,
            },
            UpdateExpression,
            ExpressionAttributeNames,
            ExpressionAttributeValues,
          })
          .promise()
      );
    } catch (err) {
      console.error(err);
    }
  }

  return promises;
};
