import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateService } from './create.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubeventDialogComponent } from './subevent-dialog/subevent-dialog.component';
import { SubEvents } from 'src/app/dto/event';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

// icon imports
import { faCalendarPlus, faCalendarMinus, faTimes } from '@fortawesome/free-solid-svg-icons';

// dayjs dependencies
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
dayjs.extend(utc);
dayjs.extend(customParseFormat);


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  private _accessToken: string = '';
  private breakpointSubscription!: Subscription;
  breakpointState!: BreakpointState;

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
  closeIcon = faTimes;

  constructor(
    private createService: CreateService,
    private modalService: NgbModal,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkForBreakpoint();
  }

  checkForBreakpoint() {
    this.breakpointSubscription = this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((state: BreakpointState) => {
        this.breakpointState = state;
      })
  }

  createEvent(): void {
    const nameInput = this.create.controls['eventName'].value;
    const dateFromInput = this.create.controls['dateFrom'].value;
    const dateToInput = this.create.controls['dateTo'].value;
    const descriptionInput = this.create.controls['description'].value;
    const timeInput = this.create.controls['time'].value;
    let requestBody;
    if (this.subEvents.length >= 1) {
      requestBody = {
        name: nameInput,
        dateFrom: this.formatDateToUTC(dateFromInput),
        dateTo: this.formatDateToUTC(dateToInput),
        description: descriptionInput,
        time: timeInput,
        eventType: 0,
        subEvents: this.subEvents
      }
    } else {
      requestBody = {
        name: nameInput,
        dateFrom: this.formatDateToUTC(dateFromInput),
        dateTo: this.formatDateToUTC(dateToInput),
        description: descriptionInput,
        time: timeInput,
        eventType: 0
      }
    }
    // console.log(requestBody);
    this.createService.createEvent(this._accessToken, requestBody).subscribe(
      (response) => {
        try {
          // console.log(response);
          if (response.id) {
            Swal.fire({
              title: 'Success!',
              titleText: 'Event created!',
              text: 'Event has been successfuly created',
              icon: 'success',
            }).then((res) => {
              // console.log(res);
              this.create.reset();
              this.subEvents = [];
              this.router.navigate(['/']);
            })
          }
        } catch (error) {
          console.log(error);
          // console.log(response)
        }
      }
    )
  }

  openSubEventDialog(): void {
    const modalRef = this.modalService.open(SubeventDialogComponent);
    modalRef.result.then((data: SubEvents) => {
      data !== undefined ? this.subEvents.push(this.formatSubEvents(data)) : '';
    }).catch((error) => {
      console.log(error);
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
    this.subEvents.splice(index, 1);
  }

}
