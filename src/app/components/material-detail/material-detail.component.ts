import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Material } from 'src/app/models/Material';
import { MaterialService } from 'src/app/services/material.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.css']
})
export class MaterialDetailComponent implements OnInit {
  material: Material;
  materialHistory : Material[];
  materialDownloadBaseUrl:string = new URL("material/download",environment.BaseUrl).href;

  constructor(private route: ActivatedRoute, private _location: Location, private materialService:MaterialService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getMaterial(id);
    this.getMaterialHistory(id);
  }

  getMaterial(id:number): void {
    this.materialService.getMaterialByID(id).subscribe(m=>{
      this.material = {...m};
    });
  }

  getMaterialHistory(id:number):void{
    this.materialService.getMaterialHistory(id).subscribe(m=>{
      this.materialHistory = m;
      console.log('material history', this.materialHistory);
    });
  }

  deleteMaterial(id:number):void{
    this.materialService.deleteMaterial(id).subscribe(()=>{
      this._location.back();
    })
  }

}
