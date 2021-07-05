import { Handler, Context } from "aws-lambda";

import { scan as scanService } from "./services/scan";
import { update as updateService } from "./services/update";

export const scan: Handler = async (event: any, context: Context) => {
  const results = await scanService();

  return {
    statusCode: 200,
    body: JSON.stringify(results),
  };
};

export const update: Handler = async (event: any, context: Context) => {
  console.log(JSON.parse(event.body));

  const results = await Promise.all(updateService(JSON.parse(event.body)));

  return {
    statusCode: 200,
    body: JSON.stringify(results),
  };
};
