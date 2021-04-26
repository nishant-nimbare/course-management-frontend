import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  materialSubPath = 'material/';
  materialBaseUrl = new URL(this.materialSubPath, environment.BaseUrl).href; 


  constructor(private http: HttpClient) { }


  getMaterialsForCourse(courseId:number){

  }

  getMaterialHistory(id:number){

  }

  createMaterial(courseId:number){

  }

  updateMaterial(id:number){

  }

  deleteMaterial(id:number){
    
  }
}
