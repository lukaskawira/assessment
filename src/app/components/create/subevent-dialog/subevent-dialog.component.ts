import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// icon imports
import { faCalendarPlus, faCalendarMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-subevent-dialog',
  templateUrl: './subevent-dialog.component.html',
  styleUrls: ['./subevent-dialog.component.scss']
})
export class SubeventDialogComponent implements OnInit {

  event = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    dateFrom: new FormControl('', [Validators.required]),
    dateTo: new FormControl('', [Validators.required]),
    time: new FormControl(''),
  });

  // icons
  dateFromIcon = faCalendarPlus;
  dateToIcon = faCalendarMinus;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.activeModal.close();
  }

  save(): void {
    const data = {
      name: this.event.controls['name'].value,
      description: this.event.controls['description'].value,
      dateFrom: this.event.controls['dateFrom'].value,
      dateTo: this.event.controls['dateTo'].value,
      time: this.event.controls['time'].value,
      eventType: 1
    };
    this.activeModal.close(data);
  }
}
