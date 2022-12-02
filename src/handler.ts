import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import middy from 'middy';
import { schemaValidator } from 'schemaValidator';
import { object, string } from 'yup';

async function hello(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `teste - env - ${process.env.TESTE}`,
      body: JSON.parse(event.body || ''),
      params: event.queryStringParameters,
    }),
  };
}

export const testeSchema = {
  body: object({
    name: string()
      .typeError('não é uma string.')
      .strict(true)
      .required('campo obritagório.'),
    email: string()
      .typeError('não é uma string.')
      .strict(true)
      .email('email inválido.')
      .required('campo obritagório.'),
  }).required(),
  queryStringParameters: object({
    id: string()
      .typeError('query params não é uma string.')
      .strict(true)
      .required('query params obritagório.'),
  }),
};

export const main = middy(hello).use(schemaValidator(testeSchema));
