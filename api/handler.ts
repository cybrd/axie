import { Handler } from "aws-lambda";

import { scan as scanService } from "./services/scan";
import { update as updateService } from "./services/update";

export const scan: Handler = async (event) => {
  const results = await scanService(JSON.parse(event.body));

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(results),
  };
};

export const update: Handler = async (event) => {
  const results = await Promise.all(updateService(JSON.parse(event.body)));

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(results),
  };
};
