import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";

import * as httpStatus from "http-status";
import { Container } from "inversify";

import getContainer from "./inversify/inversify.config";
import TYPES from "./inversify/types";
import { UsuarioService } from "./service/usuario.service";
import { User } from "./types/types";

let containerPromise: Promise<Container>;

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log("Request Event ...", event);

  if (containerPromise == null) {
    containerPromise = getContainer();
  }
  const container: Container = await containerPromise;

  const service: UsuarioService = container.get(TYPES.Service);

  const filters: any = event.queryStringParameters || {};
  let response: APIGatewayProxyResult;
  try {
    const result: User[] = await service.getUsers(filters);

    response = {
      statusCode: httpStatus.OK,
      body: JSON.stringify(result),
    } as APIGatewayProxyResult;
  } catch (error: any) {
    console.log("Error getting users ...", error);
    const statusCode: number =
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    response = {
      statusCode,
      body: JSON.stringify({ message: error.message }),
    } as APIGatewayProxyResult;
  }

  return response;
};
