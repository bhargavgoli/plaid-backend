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
module.exports.handler = async (event, context) => {

  const tokenResponse = await client.linkTokenCreate({
    user: { client_user_id: context.awsRequestId },
    client_name: "Bhargav Goli's App",
    language: "en",
    products: ["auth"],
    country_codes: ["US"],
    redirect_uri: process.env.PLAID_REDIRECT_URI,
  });

  console.log('tokenResponse', tokenResponse.data)

  return {
    statusCode: 200,
    headers: {'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': '*','Access-Control-Allow-Headers': '*'},
    body: JSON.stringify(tokenResponse.data)
  };
};
