import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CourseEdit } from 'src/app/models/CourseEdit';
import {CourseLocation} from 'src/app/models/Location';
import { CourseService } from 'src/app/services/course.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.css']
})
export class CourseEditorComponent implements OnInit {
  allLocations: CourseLocation[];
  courseEdit: CourseEdit;
  courseForm: FormGroup;


  constructor(private route: ActivatedRoute, private router: Router, private courseService:CourseService, private locationService: LocationService) { }

  ngOnInit(): void {

    this.courseForm = new FormGroup({
      name : new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      location: new FormControl(null)
    });

    this.locationService.getAllLocations()
    // .pipe(
    //   switchMap((allLoc:CourseLocation[], i:number) => {
    //     this.allLocations = allLoc;
    //     console.log(this.allLocations);
    //     this.getCourse();
    //     return of(true);
    //   })
    // )
    .subscribe(
      allLoc => {
        this.allLocations = allLoc;
        console.log(this.allLocations);
        this.getCourse();
      } 
    )
    
    // this.getCourse();
  }

  getCourse(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(id).subscribe(c => {
      if(c === null){
        this.courseEdit = {
          name:'',
          description:'',
          courseLocation:null
        };
      }
      this.courseEdit={
        id:c.id,
        name:c.name,
        description:c.description,
        courseLocation:c.courseLocation,
      };

      this.populateForm();
    });
  }

  populateForm():void {
    console.log("setting form")
    this.courseForm.get('name').setValue(this.courseEdit.name);
    this.courseForm.get('description').setValue(this.courseEdit.description);
    this.courseForm.get('location').setValue(this.courseEdit.courseLocation.id);
  
    console.log("form value ", this.courseForm.value);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.courseEdit = {...this.courseEdit, ...this.courseForm.value};
    
    this.courseEdit.courseLocation = this.getLocationById(this.courseForm.get('location').value);
    
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
  

  customCompareLocation(o1:CourseLocation, o2:CourseLocation){
    return o1.id === o2.id;
  }

  getLocationById(id:number):CourseLocation {
    // let fl = courses.filter( c => c.id === id);
    //     return (fl.length > 0) ? fl[0] : null;
    return this.allLocations.filter(
      l => l.id === id
    )[0];
  }
}
