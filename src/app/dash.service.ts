import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashService {

  constructor( private http:HttpClient) { }

  url = 'https://01.fy25ey01.64mb.io/';

  getData() {
    return this.http.get(this.url);
  }
}
