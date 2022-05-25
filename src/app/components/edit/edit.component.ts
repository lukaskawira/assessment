import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubEvents } from 'src/app/dto/event';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

// icon imports
import { faCalendarPlus, faCalendarMinus, faTimes } from '@fortawesome/free-solid-svg-icons';

// dayjs dependencies
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(utc);
dayjs.extend(customParseFormat);

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  private _accessToken: string = '';
  private breakpointSubscription!: Subscription;
  breakpointState!: BreakpointState;
  eventData: any;

  // Edit form initialization
  edit!: FormGroup;

  // icons
  dateFromIcon = faCalendarPlus;
  dateToIcon = faCalendarMinus;
  closeIcon = faTimes;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    const data = this.router.getCurrentNavigation()?.extras.state;
    if (data) {
      this.eventData = data;
      this.initializeForm();
    } else {
      console.log('No Data');
    }
  }

  ngOnInit(): void {
    console.log(this.eventData);
    console.log(this.edit.value);
  }

  initializeForm(): void {
    this.edit = this.formBuilder.group({
      eventName: new FormControl(this.eventData.name, [Validators.required, Validators.minLength(5), Validators.maxLength(256)]),
      description: new FormControl(this.eventData.description, [Validators.required, Validators.minLength(5)]),
      dateFrom: new FormControl(this.eventData.dateFrom, [Validators.required]),
      dateTo: new FormControl(this.eventData.dateTo, [Validators.required]),
      time: new FormControl(this.eventData.time)
    });
  }

  formatDateToUTC(date: string): string {
    return dayjs(date, 'D-M-YYYY').utc().format();
  }

  formatDateFromUTC(date: string): string {
    return dayjs(date).format('DD MMM YYYY');
  }

  formatSubEvents(data: SubEvents): SubEvents {
    data.dateFrom = this.formatDateToUTC(data.dateFrom);
    data.dateTo = this.formatDateToUTC(data.dateTo);
    return data;
  }

  deleteSubEvent(index: number) {
    // this.subEvents.splice(index, 1);
  }

}
