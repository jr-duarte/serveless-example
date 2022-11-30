import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export async function hello(
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> {
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `testeeee ${process.env.TESTE}`,
    }),
  };
}
