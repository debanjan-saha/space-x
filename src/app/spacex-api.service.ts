import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Launch } from './launch.model';

const BASE_URL = 'https://api.spaceXdata.com/v3/launches?limit=100';

@Injectable({ providedIn: 'root'})
export class SpaceXService {
  constructor(private http: HttpClient) {}

  getLaunches(year: number, launchSuccess: boolean, landSuccess: boolean) {
    const url = this.prepareUrl(year, launchSuccess, landSuccess);
    return this.http.get<Launch[]>(url).pipe(catchError(error => {
      console.error('Failed to get list of SpaceX launches!!', error);
      return throwError('Failed to get list of SpaceX launches!!', error);
    }));
  }

  private prepareUrl(year: number, launchSuccess: boolean, landSuccess: boolean) {
    let url = BASE_URL;
    if (year) {
      url = `${url}&launch_year=${year}`;
    }
    url = `${url}&launch_success=${launchSuccess}&land_success=${landSuccess}`;
    return url;
  }
}