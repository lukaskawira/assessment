import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  _accessToken: string = '';

  constructor(
    private homeService: HomeService,
    private oAuthService: OAuthService
  ) {}

  ngOnInit(): void {}

  hit() {
    this._accessToken = this.oAuthService.getAccessToken();
    console.log(this._accessToken);
    console.log(this.homeService.getEventList(this._accessToken));
  }
}
