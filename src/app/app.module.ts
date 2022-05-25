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
import { CustomDatePickerConfig } from '../assets/datepicker-config/config';
import { CustomAdapter, CustomDateParserFormatter } from '../assets/datepicker-config/parser';
import { SubeventDialogComponent } from './components/reusable/subevent-dialog/subevent-dialog.component';
import { EditComponent } from './components/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LogoutComponent,
    ListComponent,
    CreateComponent,
    SubeventDialogComponent,
    EditComponent
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
