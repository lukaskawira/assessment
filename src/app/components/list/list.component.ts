import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OAuthService } from 'angular-oauth2-oidc';
import { Events } from 'src/app/dto/event';
import { ListService } from './list.service';
import Swal from 'sweetalert2';
import * as dayjs from 'dayjs'

// icon imports
import { faTimes, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private _accessToken: string = '';
  private _checkFutureEvent: boolean = false;
  noDataFound: boolean = false;
  loadComponent: boolean = false;

  // Search form element
  textSearch = new FormControl('');

  // Data variables from service
  eventList!: Events;

  // Icon
  closeIcon = faTimes;
  editIcon = faPenToSquare;

  constructor(
    private listService: ListService,
    private oAuthService: OAuthService,
    private router: Router
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

  search() {
    this._checkFutureEvent ? this.searchFutureEvent() : this.searchEvent();
  }

  searchEvent() {
    const name = this.textSearch.value;
    this.listService.searchEvent(this._accessToken, name).subscribe(
      (data) => {
        this.eventList = this.formatDate(data);
        this.eventList.totalCount === 0 ? this.noDataFound = true : this.noDataFound = false;
      }
    )
  }

  searchFutureEvent() {
    const name = this.textSearch.value;

    // Construct future date object
    const futureDate = new Date().setMonth(new Date().getMonth() + 3);
    const date = dayjs(futureDate).utc().format();

    this.listService.searchFutureEvent(this._accessToken, name, date).subscribe(
      (data) => {
        this.eventList = this.formatDate(data);
        this.eventList.totalCount === 0 ? this.noDataFound = true : this.noDataFound = false;
      }
    )
  }

  futureEventCheck(event: any) {
    this._checkFutureEvent = event.target.checked;
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

  deleteEvent(id: string): void {
    Swal.fire({
      title: 'Confirm Delete Event',
      titleText: 'Event will be deleted.',
      text: 'Are you sure you want to delete this event?',
      icon: 'warning',
      showDenyButton: true,
      showConfirmButton: true,
      denyButtonText: 'No',
      confirmButtonText: 'Yes'
    }).then((res) => {
      if (res.isConfirmed) {
        this.listService.deleteEvent(this._accessToken, id).subscribe(
          (res) => {
            if (res === null) {
              window.location.reload();
            } else {
              console.log(res);
            }
          }
        )
      }
    })
  }

  editEvent(id: string): void {
    this.listService.getEventById(this._accessToken, id).subscribe(
      (res) => {
        try {
          if (res.id !== null) {
            this.router.navigate(['edit'], {
              state: res
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    )
  }
}
