import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LogoutComponent } from './components/logout/logout.component';
import { ListComponent } from './components/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './components/create/create.component';
import { CustomDatePickerConfig } from './components/create/datepicker-config/config';
import { CustomAdapter, CustomDateParserFormatter } from './components/create/datepicker-config/parser';
import { SubeventDialogComponent } from './components/create/subevent-dialog/subevent-dialog.component';
import { HamburgerToggleDirective } from './components/sidenav/hamburger-directive/hamburger-toggle.directive';
import { SuccessDialogComponent } from './components/reuseable/success-dialog/success-dialog.component';
import { FailedDialogComponent } from './components/reuseable/failed-dialog/failed-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LogoutComponent,
    ListComponent,
    CreateComponent,
    SubeventDialogComponent,
    HamburgerToggleDirective,
    SuccessDialogComponent,
    FailedDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [
          'https://surerassessmenthttpapihost20220517140636.azurewebsites.net',
        ],
        sendAccessToken: true,
      },
    }),
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: NgbDatepickerConfig, useClass: CustomDatePickerConfig },
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
