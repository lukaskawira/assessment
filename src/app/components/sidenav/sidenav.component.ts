import { Component, OnInit } from '@angular/core';
import { faRightFromBracket, faFolder, faCirclePlus, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  // ICON VARIABLE
  logoutIcon = faRightFromBracket;
  eventsIcon = faFolder;
  createIcon = faCirclePlus;
  listIcon = faList;

  constructor() { }

  ngOnInit(): void {
  }

}
