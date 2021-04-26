import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseEdit } from 'src/app/models/CourseEdit';
import {CourseLocation} from 'src/app/models/Location';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.css']
})
export class CourseEditorComponent implements OnInit {
  allLocations: CourseLocation[];
  courseEdit: CourseEdit;
  courseForm: FormGroup;


  constructor(private route: ActivatedRoute, private router: Router, private courseService:CourseService) { }

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(id).subscribe(c => {
      if(c === null){
        this.courseEdit = {
          name:'',
          description:'',
        };
      }
      this.courseEdit={
        id:c.id,
        name:c.name,
        description:c.description,
        location:c.location,
      };

      this.populateForm();
    });
  }

  populateForm():void {
    this.courseForm = new FormGroup({
      name : new FormControl(this.courseEdit.name, [Validators.required]),
      description: new FormControl(this.courseEdit.description, [Validators.required])
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.courseEdit = {...this.courseEdit, ...this.courseForm.value};
    
    console.log('course :', this.courseEdit);
    
    if(this.courseEdit.id)
      this.courseService.editCourse(this.courseEdit).subscribe(()=>{
        console.log('done1');
        this.router.navigate(['/detail/'+this.courseEdit.id]);
      });
    else
      this.courseService.addCourse(this.courseEdit).subscribe(()=>{
        console.log('done2');
        this.router.navigate(['/home']);
      });  
  }
  

}
