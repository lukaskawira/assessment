import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateService } from './create.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubeventDialogComponent } from './subevent-dialog/subevent-dialog.component';
import { SubEvents } from 'src/app/dto/event';

// icon imports
import { faCalendarPlus, faCalendarMinus } from '@fortawesome/free-solid-svg-icons';

// dayjs dependencies
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(utc);
dayjs.extend(customParseFormat);


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  private _accessToken: string = '';
  loadComponent: boolean = false;
  subEvents: SubEvents[] = [];

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
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  createEvent(): void {
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
      subEvents: this.formatSubEvents(this.subEvents)
    }
    this.createService.createEvent(this._accessToken, requestBody).subscribe(
      (response) => {
        console.log(response);
      }
    )
  }

  openSubEventDialog(): void {
    const modalRef = this.modalService.open(SubeventDialogComponent);
    modalRef.result.then((data) => {
      data !== undefined ? this.subEvents.push(data) : '';
    }).catch((error) => {
      console.log(error);
    });
  }

  formatDateToUTC(date: string): string {
    return dayjs(date, 'DD-M-YYY').utc().format();
  }

  formatDateFromModal(date: string): string {
    return dayjs(date, 'DD-M-YYYY').format('DD MMM YYYY');
  }

  formatSubEvents(data: SubEvents[]): SubEvents[] {
    for (let i = 0; i < data.length; i++) {
      data[i].dateFrom = this.formatDateToUTC(data[i].dateFrom);
      data[i].dateTo = this.formatDateToUTC(data[i].dateTo);
    }
    return data;
  }

}
