import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://surerassessmenthttpapihost20220517140636.azurewebsites.net',
  redirectUri: 'http://localhost:4200',
  clientId: 'Assessment_App',
  dummyClientSecret: '1q2w3E*',
  responseType: 'code',
  scope: 'offline_access Assessment',
  showDebugInformation: true,
};
