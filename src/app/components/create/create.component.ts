import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OAuthService } from 'angular-oauth2-oidc';
import { CreateService } from './create.service';

// icon imports
import { faCalendarPlus, faCalendarMinus } from '@fortawesome/free-solid-svg-icons';

// dayjs dependencies
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubeventDialogComponent } from './subevent-dialog/subevent-dialog.component';
dayjs.extend(utc);


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  private _accessToken: string = '';
  loadComponent: boolean = false;

  // Request body form
  create = new FormGroup({
    eventName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    dateFrom: new FormControl('', [Validators.required]),
    dateTo: new FormControl('', [Validators.required]),
    time: new FormControl('')
  });

  // icons
  dateFromIcon = faCalendarPlus;
  dateToIcon = faCalendarMinus;

  constructor(
    private createService: CreateService,
    private oAuthService: OAuthService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  createEvent() {
    const nameInput = this.create.controls['eventName'].value;
    const dateFromInput = this.create.controls['dateFrom'].value;
    const dateToInput = this.create.controls['dateTo'].value;
    const descriptionInput = this.create.controls['description'].value;
    const timeInput = this.create.controls['time'].value;
    const requestBody = {
      name: nameInput,
      dateFrom: this.formatDateToUTC(dateFromInput),
      dateTo: this.formatDateToUTC(dateToInput),
      description: descriptionInput,
      time: timeInput,
      eventType: 0, // MAIN EVENT
      subEvents: [
        "string"
      ]
    }
    console.log(requestBody);
  }

  formatDateToUTC(date: any): string {
    return dayjs(date).utc().format();
  }

  openSubEventDialog(): void {
    const modalRef = this.modalService.open(SubeventDialogComponent);
    modalRef.result.then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    });
  }

}
