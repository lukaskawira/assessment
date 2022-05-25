import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient) { }

  getEventList(accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    });
    return this.httpClient
      .get(`${environment.endpoint}/api/app/events`, {
        headers: headers,
      });
  }

  searchEvent(accessToken: string, name: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    });
    return this.httpClient
      .get(`${environment.endpoint}/api/app/events`, {
        params: {
          name
        },
        headers: headers,
      });
  }

  searchFutureEvent(accessToken: string, name: string, dateToMax: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    });
    return this.httpClient
      .get(`${environment.endpoint}/api/app/events`, {
        params: {
          name,
          dateToMax
        },
        headers: headers,
      });
  }

  deleteEvent(accessToken: string, id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    });
    return this.httpClient
      .delete(`${environment.endpoint}/api/app/events/${id}`, {
        headers: headers
      });
  }

  getEventById(accessToken: string, id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    });
    return this.httpClient
      .get(`${environment.endpoint}/api/app/events/${id}`, {
        headers: headers
      });
  }

  updateEvent(accessToken: string, id: string, requestBody: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    });
    return this.httpClient
      .put(`${environment.endpoint}/api/app/events/${id}`, requestBody,
        {
          headers: headers
        });
  }
}
