import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(private httpClient: HttpClient) { }

  createEvent(accessToken: string, requestBody: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    });
    return this.httpClient.post(`${environment.endpoint}/api/app/events`, requestBody, {
      headers: headers,
    });
  }
}
