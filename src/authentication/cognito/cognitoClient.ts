import { CognitoUserPool } from "amazon-cognito-identity-js";

export const poolData = {
  UserPoolId: "eu-central-1_LpAP2OKCU",
  ClientId: "mu3f96af5b28u7jqh4ahco7dk",
};

export const userPool = new CognitoUserPool(
  poolData
);
