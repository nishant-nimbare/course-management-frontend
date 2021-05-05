import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/models/Course';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {

  @Input() course: Course;

  constructor( private  authGuard: AuthGuardService) { }

  ngOnInit(): void {
  }

  isTrainer():boolean{
    return this.authGuard.isTrainer();
  }

}
