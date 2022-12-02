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
      .typeError('name - não é uma string')
      .strict(true)
      .required('name - campo obritagório'),
    email: string()
      .typeError('email - não é uma string')
      .strict(true)
      .email('email - inválido')
      .required('email - campo obritagório'),
  }).required(),
  queryStringParameters: object({
    id: string()
      .typeError('id - não é uma string')
      .strict(true)
      .required('id - campo obritagório'),
  }),
};

export const main = middy(hello).use(schemaValidator(testeSchema));
