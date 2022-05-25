import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  constructor(private httpClient: HttpClient) { }

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
