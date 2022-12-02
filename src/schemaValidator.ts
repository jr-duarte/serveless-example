import { APIGatewayEvent } from 'aws-lambda';
import { BaseSchema, ValidationError } from 'yup';

type TRequest = {
  event: APIGatewayEvent;
};

export const schemaValidator = (schema: {
  body?: BaseSchema;
  queryStringParameters?: BaseSchema;
}) => {
  const before = async (request: TRequest) => {
    try {
      const { body, queryStringParameters } = request.event;

      if (schema.body) {
        schema.body.validateSync(body, {
          abortEarly: false,
        });
      }

      if (schema.queryStringParameters) {
        schema.queryStringParameters.validateSync(queryStringParameters ?? {}, {
          abortEarly: false,
        });
      }

      return Promise.resolve();
    } catch (e) {
      const error = e as ValidationError;
      return {
        statusCode: 400,
        body: JSON.stringify({
          errors: error.inner.map((item) => {
            return {
              field: item.path,
              error: item.message,
            };
          }),
        }),
      };
    }
  };

  return {
    before,
  };
};
