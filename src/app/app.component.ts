import { AfterViewInit, Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authCodeFlowConfig } from './auth.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  identityToken: any;
  _accessToken: string = '';

  constructor(private oAuthService: OAuthService) {
    this.configureLoginOptions();
    
  }

  configureLoginOptions(): void {
    console.log(authCodeFlowConfig);
    this.oAuthService.configure(authCodeFlowConfig);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.oAuthService.loadDiscoveryDocumentAndLogin();
  }

  logout(): void {
    this.oAuthService.revokeTokenAndLogout();
  }

  get token(): any {
    let claims: any = this.oAuthService.getIdentityClaims();
    this._accessToken = this.oAuthService.getAccessToken();
    this.identityToken = claims;
    return claims ? claims : null;
  }
}
