import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { Course } from '../models/Course';
import { HttpClient } from '@angular/common/http';

import {environment} from '../../environments/environment';
import { CourseEdit } from '../models/CourseEdit';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courseSubPath = 'course/';
  courseBaseUrl = new URL(this.courseSubPath, environment.BaseUrl).href; 

  courseUrl(id:number){
    return new URL(this.courseSubPath+id, environment.BaseUrl).href;
  }


  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.courseBaseUrl);
  }

  getCourse(id:number): Observable<Course> {
    // return this.mock.pipe(map(
    //   courses =>{
    //     let fl = courses.filter( c => c.id === id);
    //     return (fl.length > 0) ? fl[0] : null;
    //   }
    // )) 

    if(id === null || id === undefined) return of(null);

    let courseUrl = this.courseUrl(id);
    console.log(" hitting ", courseUrl);

    let requests = [];

    requests.push(this.http.get<Course>(courseUrl));
    
    // requests.push(this.http.get(courseUrl+'/skills'));
    requests.push(this.getSkills(id));
    // requests.push(this.http.get(courseUrl+'/prerequisites'));
    requests.push(this.getPrequisites(id));
    
    return forkJoin(requests)
    .pipe(
      map((data:any[])=>{
        // data[0] is course
        // data[1] is skills
        // data[2] is prerequisites

        let course:Course = {...data[0]}; 

        course.skills = data[1];
        course.prerequisites = data[2];

        console.log('course in fork join ', course);
        return course;
      })
    );

  }


  addCourse(course:CourseEdit){ 
    return this.http.post(this.courseBaseUrl, course);  
  }

  editCourse(course:CourseEdit){
    if (course.id === null || course.id === undefined ) return this.addCourse(course);
    return this.http.put(this.courseUrl(course.id), course);
  }

  deleteCourse(id){
    if ((!id )|| (id === null) || (id === undefined) ) return ;
    return this.http.delete(this.courseUrl(id));
  }

  //SKILLS
  getSkills(courseId:number):Observable<string[]>{
      if(!courseId) return of([]);
      return this.http.get<string[]>(this.courseUrl(courseId)+'/skills');
  }

  addSkill(courseId:number, skill: string ){
    if(!courseId || !skill) return of(null);
    return this.http.post(this.courseUrl(courseId)+'/skills', [skill]); 
  }

  removeSkill(courseId:number, skill: string ){
    if(!courseId || !skill) return of(null);
    return this.http.delete(this.courseUrl(courseId)+'/skills/'+skill);
  }

  //pre requisites
  getPrequisites(courseId):Observable<string[]>{
    if(!courseId) return of([]);
    return this.http.get<string[]>(this.courseUrl(courseId)+'/prerequisites');
  }

  addPrequisite(courseId:number, prereq:string){
    if(!courseId || !prereq) return of(null);
    return this.http.post(this.courseUrl(courseId)+'/prerequisites', [prereq]); 
  }

  removePrequisite(courseId:number, prereq: string ){
    if(!courseId || !prereq) return of(null);
    return this.http.delete(this.courseUrl(courseId)+'/prerequisites/'+prereq);
  }
}
