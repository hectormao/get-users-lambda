import "reflect-metadata";
import { Container } from "inversify";
import { UsuarioRepository } from "../repository/usuario.repository";
import { UsuarioService } from "../service/usuario.service";
import TYPES from "../inversify/types";
import { createPool, Pool } from "mariadb";
import { SecretsManager, SES } from "aws-sdk";
import { GetSecretValueResponse } from "aws-sdk/clients/secretsmanager";

const getContainer = async () => {
  const container: Container = new Container();
  container.bind<UsuarioRepository>(TYPES.Repository).to(UsuarioRepository);
  container.bind<UsuarioService>(TYPES.Service).to(UsuarioService);

  const secret: SecretsManager = new SecretsManager({
    region: process.env.AWS_REGION || "us-east-1",
  });

  const secretId: string = process.env.SECRET_ID as string;

  const dbSecret: GetSecretValueResponse = await secret
    .getSecretValue({ SecretId: secretId })
    .promise();

  const credentials: any = JSON.parse(dbSecret.SecretString as string);

  console.log("Getting credentials ...", credentials.host);

  const pool: Pool = createPool({
    host: credentials.host,
    port: credentials.port,
    user: credentials.username,
    password: credentials.password,
    database: process.env.DB_NAME,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || "5"),
  });
  container.bind<Pool>(TYPES.DBPool).toConstantValue(pool);
  return container;
};
export default getContainer;
