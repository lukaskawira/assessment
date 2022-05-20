import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Events } from '../dto/event';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpClient: HttpClient) { }

  getEventList(accessToken: string): Observable<Events> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
    return this.httpClient
      .get<Events>(`${environment.endpoint}/api/app/events`, {
        headers: headers,
      }).pipe(
        map((res: Events) => {
          console.log(res);
          return res;
        })
      );
  }
}
