import { Component, Input, OnInit } from '@angular/core';
import { Material } from 'src/app/models/Material';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
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


  constructor(private materialService:MaterialService, private authGuard: AuthGuardService) { }

  ngOnInit(): void {
    
    this.materialService.getMaterialsForCourse(this.courseId).subscribe(
      m => this.materials = m
    );
  
  }

  isTrainer():boolean{
    return this.authGuard.isTrainer();
  }
  
}
