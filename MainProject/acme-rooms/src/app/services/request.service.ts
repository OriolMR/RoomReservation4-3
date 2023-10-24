import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { __rest } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private httpClient: HttpClient) { }

  public post(url: string, body: object): Observable<any> {
    return this.httpClient.post<any>(url, body);
  }

  // if parameters is undefined, the options parameter of httpClient.get() is passed an empty object
  public get(url: string, parameters?: HttpParams): Observable<any> {
    return this.httpClient.get<any>(url, parameters === undefined ? {} : { params: parameters });
  }

  public put(url: string, body: object): Observable<any> {
    return this.httpClient.put<any>(url, body);
  }

  public delete(url: string, parameters?: HttpParams): Observable<any> {
    return this.httpClient.delete<any>(url, parameters === undefined ? {} : { params: parameters });
  }
}
