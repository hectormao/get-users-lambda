import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { handler } from "./handler";

const event: APIGatewayProxyEvent = {
  headers: {
    Authorization:
      "Bearer eyJraWQiOiJ5eDFtZTFZZ05kOTNHT3NuSVNMZVNPdWZcL2dhaWNFVW5pYjJjY0lET1JKQT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiTURSa3B3QkQ3eHBITzNoaDFacUJ0dyIsInN1YiI6Ijk3YTdiNzVmLTcyMTItNGFiOS05Njg2LTQ1MGEwZmE1NGUxNyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9qMjRDTXQzamgiLCJjb2duaXRvOnVzZXJuYW1lIjoiOTdhN2I3NWYtNzIxMi00YWI5LTk2ODYtNDUwYTBmYTU0ZTE3IiwiYXVkIjoiNHIwMnFiZWpuZ3J2NmkyMWt1a2RtdWpyb2wiLCJldmVudF9pZCI6IjdkMWE0YTMyLTdmNDUtNDhlMS04MzA1LWY2ZjI0YjA2NDEwMSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjY2OTE3NTk4LCJuYW1lIjoiSGVjdG9yIE1hdXJpY2lvIEdvbnphbGV6IiwiZXhwIjoxNjY2OTIxMTk4LCJpYXQiOjE2NjY5MTc1OTgsImp0aSI6IjFjZDhiYjg4LWQ3MmItNGVmNS05ZTA4LTVlMjliOTM5ZDQzNSIsImVtYWlsIjoiaGVjdG9ybWFvLmdvbnphbGV6QGdtYWlsLmNvbSJ9.O9xSmMMkx-asGNa-Vit11b923QfBIvYyj5iQTa59eRkopZ-0pkRW75D_J5rMvg3t7iOye4xdJx5I33kkXPLwFlIhYG74OIIt1UBglsylunz1MApXHeb61O2a8vUEIziVr6Lm5ApFzZNur8Q-mzZ4ov3Ju_L9rDrf6_Lo74A974p96AiCuvWGOE9d4G9Uhs33pZ-cHYkvFE_IDhVDnEpEQ94wzsDUVo3igTsdFTQzfHhO-RrTgTeN6-W71ERtwh5wUA1mf13XBwrMPzZ6c4h35bFe52GBg_pIyH7GLzrVVXb_a9K9RNtB-hiGVuBROGaGbrfkp0U78tnUYS6iEil4Kg",
  },
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
