import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

import { MaterialEdit } from 'src/app/models/MaterialEdit';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-material-editor',
  templateUrl: './material-editor.component.html',
  styleUrls: ['./material-editor.component.css']
})
export class MaterialEditorComponent implements OnInit {
  courseId: number;
  materialId:number;
  materialEdit: MaterialEdit;
  materialForm: FormGroup;
  fileToUpload: File = null;

  constructor(private route: ActivatedRoute, private _location: Location, private materialService:MaterialService) { }

  ngOnInit(): void {
    this.materialForm  =  new FormGroup({
      name : new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    this.materialId = +this.route.snapshot.paramMap.get('id');
    this.courseId = +this.route.snapshot.paramMap.get('courseId');

    if(this.materialId) this.getMaterial(this.materialId);
  }

  getMaterial(id:number): void {
    this.materialService.getMaterialByID(id).subscribe(m=>{
      this.materialEdit = {...m};
      this.populateForm();
    });
  }

  populateForm():void {
    this.materialForm.get('name').setValue(this.materialEdit.name);
    this.materialForm.get('description').setValue(this.materialEdit.description);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit():void {
    console.log("material form :", this.materialForm.value, this.fileToUpload);
    this.materialEdit = {...this.materialEdit,...this.materialForm.value};
    if(this.materialId){
      //update
      this.materialService.updateMaterial(this.materialId, this.materialEdit, this.fileToUpload).subscribe(()=>{
        this._location.back();
      });
    }else{
      //create
      if((!this.courseId ) || (!this.fileToUpload)) return;

      this.materialService.createMaterial(this.courseId, this.materialEdit, this.fileToUpload).subscribe(()=>{
        this._location.back();
      })
    }
  }

}
