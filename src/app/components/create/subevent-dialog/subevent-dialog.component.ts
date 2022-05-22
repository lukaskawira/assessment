import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-subevent-dialog',
  templateUrl: './subevent-dialog.component.html',
  styleUrls: ['./subevent-dialog.component.scss']
})
export class SubeventDialogComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.activeModal.close();
  }
}
