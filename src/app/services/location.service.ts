import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseLocation } from '../models/Location';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  locationSubPath = 'location/' 
  
  locationBaseUrl = new URL(this.locationSubPath, environment.BaseUrl).href; 

  constructor(private http: HttpClient) { }

  getAllLocations(): Observable<CourseLocation[]> {
    console.log('locationService hitting:', this.locationBaseUrl)
    return this.http.get<CourseLocation[]>(this.locationBaseUrl);
  }

  createLocation(name:string): Observable<CourseLocation> {
    return this.http.post<CourseLocation>(this.locationBaseUrl+'?name='+name, {});
  }

}
