import { Component, OnInit } from '@angular/core';
import { faRightFromBracket, faFolder } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  // ICON VARIABLE
  logoutIcon = faRightFromBracket;
  eventsIcon = faFolder;

  constructor() { }

  ngOnInit(): void {
  }

}
