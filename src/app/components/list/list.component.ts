import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private _accessToken: string = '';

  constructor(
    private listService: ListService,
    private oAuthService: OAuthService
  ) { }

  ngOnInit(): void {
  }

  getEventList() {
    this._accessToken = this.oAuthService.getAccessToken();
    this.listService.getEventList(this._accessToken).subscribe(
      (data) => {
        console.log(data);
      }
    )
  }

}
