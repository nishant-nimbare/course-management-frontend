import { Component, Input, OnInit } from '@angular/core';
import { Material } from 'src/app/models/Material';
import { MaterialService } from 'src/app/services/material.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent implements OnInit {

  @Input() courseId:number;
  materials: Material[];
  
  materialDownloadBaseUrl:string = new URL("material/download",environment.BaseUrl).href;


  constructor(private materialService:MaterialService) { }

  ngOnInit(): void {
    
    this.materialService.getMaterialsForCourse(this.courseId).subscribe(
      m => this.materials = m
    );
  
  }

  
}
