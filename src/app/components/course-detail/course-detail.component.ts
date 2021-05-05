import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/Course';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course:Course;
  newSkillInput:FormControl = new FormControl('');
  newPreReqInput:FormControl = new FormControl('');

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService, private  authGuard: AuthGuardService) { }

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(id).subscribe(c => this.course=c);
  }

  deleteCourse(){
    this.courseService.deleteCourse(this.course.id).subscribe(()=>{
      this.router.navigate(['/home']);
    });
  }
  
  addSkill(){
    let skill = this.newSkillInput.value;
    if(!skill) return;
    this.courseService.addSkill(this.course.id, skill).subscribe(()=>{
      this.course.skills.push(skill);
    });
  }

  addPreReq(){
    let prereq = this.newPreReqInput.value;
    if(!prereq) return;
    this.courseService.addPrequisite(this.course.id, prereq).subscribe(()=>{
      this.course.prerequisites.push(prereq);
    });
  }

  removeSkill(i:number){
    this.courseService.removeSkill(this.course.id, this.course.skills[i] ).subscribe(()=>{
      this.course.skills.splice(i, 1);
    });
  }

  removePreReq(i:number){
    this.courseService.removePrequisite(this.course.id, this.course.prerequisites[i]).subscribe(()=>{
      this.course.prerequisites.splice(i,1);
    });
  }

  isTrainer():boolean{
    return this.authGuard.user.getValue().isTrainer;
    // return this.authGuard.isTrainer();
  }

  showMaterial():boolean{
    return (
      (this.isTrainer()) ||
      (this.course.enrolled)
    );
  }
}
