import { Handler, Context } from "aws-lambda";

import { create as createService } from "./services/create";

export const create: Handler = async (event: any, context: Context) => {
  await createService();

  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 1,
      message: 2,
      data: 3,
    }),
  };
};
