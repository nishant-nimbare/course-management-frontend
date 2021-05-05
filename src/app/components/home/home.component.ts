import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/Course';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchQuery:string;
  courses:Course[];
  
  constructor(private courseService: CourseService, private authGuard: AuthGuardService) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses():void{
    this.courseService.getCourses().subscribe(courses => this.courses = courses);
  }

  search(){
    console.log('searching for ', this.searchQuery);
    this.courseService.getCourses(this.searchQuery).subscribe(courses => this.courses = courses);
  }

  isTrainer():boolean{
    return this.authGuard.isTrainer();
  }
}
