import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {environment} from '../../environments/environment';
import { Trend } from '../models/Trend';

@Injectable({
  providedIn: 'root'
})
export class TrendsService {

  trendsSubPath = 'trends/';

  constructor(private http: HttpClient) { }

  mapTrends = (result):Trend[] => {
    let t = [] as Trend[];
          
    for (const [k, v] of Object.entries(result)) {
      console.log(`${k}: ${v}`);
      t.push({
        label:k,
        value:parseInt(v as string),
      });
    }
    
    return t;
  }


  getEnrollmentTrend():Observable<Trend[]>{

    return this.http.get<any>(new URL(this.trendsSubPath+'enrollment', environment.BaseUrl).href).pipe(
      map(this.mapTrends)
    );
  }

  getTopFiveSkills():Observable<Trend[]>{
    return this.http.get<any>(new URL(this.trendsSubPath+'skill', environment.BaseUrl).href).pipe(
      map(this.mapTrends)
    );
  }

  getTopFivePrereq():Observable<Trend[]>{
    return this.http.get<any>(new URL(this.trendsSubPath+'prereq', environment.BaseUrl).href).pipe(
      map(this.mapTrends)
    );
  }

  
}
