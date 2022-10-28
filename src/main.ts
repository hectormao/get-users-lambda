import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { handler } from "./handler";

const event: APIGatewayProxyEvent = {
  headers: {},
  queryStringParameters: {
    ciudad: "manizales",
  },
} as unknown as APIGatewayProxyEvent;
const context: Context = {} as Context;

const resultPromise: Promise<APIGatewayProxyResult> = handler(
  event,
  context,
  () => {}
) as Promise<APIGatewayProxyResult>;

resultPromise.then(
  (result) => console.log(result),
  (error) => console.error(error)
);
