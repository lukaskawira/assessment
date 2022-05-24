import { Component, OnInit } from '@angular/core';
import { faRightFromBracket, faFolder, faCirclePlus, faList } from '@fortawesome/free-solid-svg-icons';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  private breakpointSubscription!: Subscription;
  breakpointState!: BreakpointState;
  openMenu: boolean = false;

  // ICON VARIABLE
  logoutIcon = faRightFromBracket;
  eventsIcon = faFolder;
  createIcon = faCirclePlus;
  listIcon = faList;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.checkForBreakpoint();
  }

  checkForBreakpoint(): void {
    this.breakpointSubscription = this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((state: BreakpointState) => {
        this.breakpointState = state;
      })
  }

  toggleHamburgerMenu(): void {
    this.openMenu = !this.openMenu;
  }

}
