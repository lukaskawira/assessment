import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private oAuthService: OAuthService
  ) { }

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    this.oAuthService.revokeTokenAndLogout();
  }
}
