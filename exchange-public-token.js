'use strict';
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");

const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});

const client = new PlaidApi(config);
module.exports.handler = async (event) => {

  console.log('event', JSON.stringify(event));

  const {body} = event;

  const parsedBody = JSON.parse(body);

  console.log('parsedBody', parsedBody);

  const exchangeResponse = await client.itemPublicTokenExchange({
    public_token: parsedBody.public_token,
  });

  console.log('exchangeResponse', JSON.stringify(exchangeResponse.data));
  return {
    statusCode: 200,
    headers: {'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': '*','Access-Control-Allow-Headers': '*'},
    body: JSON.stringify({access_token: exchangeResponse.data.access_token})
  };
};
