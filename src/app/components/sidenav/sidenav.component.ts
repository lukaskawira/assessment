import { Component, OnInit, ViewChild } from '@angular/core';
import { faRightFromBracket, faFolder, faCirclePlus, faList } from '@fortawesome/free-solid-svg-icons';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('hamburger') hamburger: any;
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
    if (this.hamburger.nativeElement.classList.contains('is-active')) {
      this.hamburger.nativeElement.classList.remove('is-active');
    } else {
      this.hamburger.nativeElement.classList.add('is-active');
    }
  }

}
