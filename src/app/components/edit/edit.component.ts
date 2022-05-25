import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SubEvents } from 'src/app/dto/event';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EditService } from './edit.service';

// icon imports
import { faCalendarPlus, faCalendarMinus } from '@fortawesome/free-solid-svg-icons';

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

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private editService: EditService
  ) {
    const data = this.router.getCurrentNavigation()?.extras.state;
    if (data) {
      this.eventData = data;
      this.initializeForm();
    } else {
      console.error('no data, returning back to list page.');
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.checkForBreakpoint();
    console.log(this.eventData);
  }

  checkForBreakpoint(): void {
    this.breakpointSubscription = this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((state: BreakpointState) => {
        this.breakpointState = state;
      })
  }

  initializeForm(): void {
    const dateFromFormatted = this.formatDateFromUTCToDatePicker(this.eventData.dateFrom);
    const dateToFormatted = this.formatDateFromUTCToDatePicker(this.eventData.dateTo);
    this.edit = this.formBuilder.group({
      eventName: new FormControl(this.eventData.name, [Validators.required, Validators.minLength(5), Validators.maxLength(256)]),
      description: new FormControl(this.eventData.description, [Validators.required, Validators.minLength(5)]),
      dateFrom: new FormControl(dateFromFormatted, [Validators.required]),
      dateTo: new FormControl(dateToFormatted, [Validators.required]),
      time: new FormControl(this.eventData.time)
    });
  }

  formatDateToUTC(date: string): string {
    return dayjs(date, 'D-M-YYYY').utc().format();
  }

  formatDateFromUTCToDatePicker(date: string): string {
    return dayjs(date).format('D-M-YYYY');
  }

  formatDateFromUTC(date: string): string {
    return dayjs(date).format('DD MMM YYYY');
  }

  formatSubEvents(data: SubEvents): SubEvents {
    data.dateFrom = this.formatDateToUTC(data.dateFrom);
    data.dateTo = this.formatDateToUTC(data.dateTo);
    return data;
  }

  updateEvent(): void {
    const nameInput = this.edit.controls['eventName'].value;
    const dateFromInput = this.edit.controls['dateFrom'].value;
    const dateToInput = this.edit.controls['dateTo'].value;
    const descriptionInput = this.edit.controls['description'].value;
    const timeInput = this.edit.controls['time'].value;
    const id = this.eventData.id;
    const requestBody = {
      name: nameInput,
      dateFrom: this.formatDateToUTC(dateFromInput),
      dateTo: this.formatDateToUTC(dateToInput),
      description: descriptionInput,
      time: timeInput,
      eventType: 0
    }
    console.log(requestBody);
    this.editService.updateEvent(this._accessToken, id, requestBody).subscribe(
      (response) => {
        try {
          if (response.id) {
            Swal.fire({
              title: 'Updated!',
              titleText: 'Event has been successfuly updated.',
              icon: 'success'
            }).then((res) => {
              this.router.navigate(['/']);
            })
          }
        } catch (error) {
          console.log(error);
        }
      }
    )
  }

}
