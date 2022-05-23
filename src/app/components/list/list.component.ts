import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OAuthService } from 'angular-oauth2-oidc';
import { Events } from 'src/app/dto/event';
import { ListService } from './list.service';
import * as dayjs from 'dayjs'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private _accessToken: string = '';
  loadComponent: boolean = false;

  // Search form element
  textSearch = new FormControl('');

  // Data variables from service
  eventList!: Events;

  constructor(
    private listService: ListService,
    private oAuthService: OAuthService
  ) { }

  ngOnInit(): void {
    this.getEventList();
  }

  getEventList() {
    // INITIALIZE ACCESS TOKEN
    this._accessToken = this.oAuthService.getAccessToken();
    this.listService.getEventList(this._accessToken).subscribe(
      (data) => {
        this.eventList = this.formatDate(data);
        this.loadComponent = true;
      }
    )
  }

  searchEvent() {
    const name = this.textSearch.value;
    this.listService.searchEvent(this._accessToken, name).subscribe(
      (data) => {
        console.log(data);
      }
    )
  }

  formatDate(data: Events): Events {
    for (let i = 0; i < data.items.length; i++) {
      data.items[i].dateFrom = dayjs(data.items[i].dateFrom).format('DD MMM YYYY');
      data.items[i].dateTo = dayjs(data.items[i].dateTo).format('DD MMM YYYY');
      for (let j = 0; j < data.items[i].subEvents.length; j++) {
        data.items[i].subEvents[j].dateFrom = dayjs(data.items[i].subEvents[j].dateFrom).format('DD MMM YYYY');
        data.items[i].subEvents[j].dateTo = dayjs(data.items[i].subEvents[j].dateTo).format('DD MMM YYYY');
      }
    }
    return data;
  }

}
