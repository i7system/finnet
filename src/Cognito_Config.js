import { CognitoUserPool } from 'amazon-cognito-identity-js';
const poolData = {
  UserPoolId: 'us-east-1_QchVNFUcX',
  ClientId: '670gir2p005asc9o9shhekh3s1'
};

export default new CognitoUserPool(poolData);