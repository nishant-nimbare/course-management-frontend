import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { Material } from '../models/Material';
import { MaterialEdit } from '../models/MaterialEdit';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  materialSubPath = 'material/';
  materialBaseUrl = new URL(this.materialSubPath, environment.BaseUrl).href; 


  materialUrl(id:number):string{
    return new URL(this.materialSubPath+id, environment.BaseUrl).href;
  }

  materialHistoryUrl(id:number):string{
    return new URL('material/history/'+id, environment.BaseUrl).href;
  }


  constructor(private http: HttpClient) { }


  getMaterialsForCourse(courseId:number):Observable<Material[]>{
    return this.http.get<Material[]>(this.materialBaseUrl+"?courseId="+courseId);
  }

  getMaterialByID(id:number):Observable<Material>{
    return this.http.get<Material>(this.materialUrl(id));
  }

  getMaterialHistory(id:number):Observable<Material[]>{
    return this.http.get<Material[]>(this.materialHistoryUrl(id));
  }

  createMaterial(courseId:number, material:MaterialEdit, file:File):Observable<Material>{
    let formData: FormData = new FormData();

    formData.append('courseId', ""+courseId);
    formData.append('name', material.name);
    formData.append('description', material.description);
    formData.append('file', file, file.name);

    return this.http.post<Material>(this.materialBaseUrl, formData);
  }

  updateMaterial(id:number, material:MaterialEdit, file:File):Observable<Material>{
    if(!id) return ;

    console.log('updating material', id)

    let formData: FormData = new FormData();

    if(material.name) formData.append('name', material.name);
    if(material.description) formData.append('description', material.description);
    if(file) formData.append('file', file, file.name);

    return this.http.put<Material>(this.materialUrl(id), formData);
  }

  deleteMaterial(id:number){
    return this.http.delete(this.materialUrl(id));
  }
}
