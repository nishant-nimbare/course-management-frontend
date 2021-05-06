import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexDataLabels, ApexPlotOptions, ApexXAxis, ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { TrendsService } from 'src/app/services/trends.service';

type ChartOptions = {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  xaxis: ApexXAxis;
};



@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {
  
  @ViewChild("enrollChart") enrollChart: ChartComponent;
  @ViewChild("skillChart") skillChart: ChartComponent;
  @ViewChild("preReqChart") preReqChart: ChartComponent;

  public enrollChartOptions: Partial<ChartOptions>;
  public skillChartOptions: Partial<ChartOptions>;
  public preReqChartOptions: Partial<ChartOptions>;
  
  constructor(private trendsService: TrendsService) {
   }

  ngOnInit(): void {
    
    this.trendsService.getEnrollmentTrend().subscribe(res=>{

      this.enrollChartOptions = {
        series: res.map(e=>e.value),
        chart: {
          height:200,
          type: "donut"
        },
        labels: res.map(e=>e.label),
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    });
  

    this.trendsService.getTopFiveSkills().subscribe(res=>{
      this.skillChartOptions = {
        series: [
          {
            name: "basic",
            data: res.map(e=>e.value),
          }
        ],
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: res.map(e=>e.label)
        }
      };
    });


    this.trendsService.getTopFivePrereq().subscribe(res=>{
      this.preReqChartOptions= {
        series: [
          {
            name: "basic",
            data: res.map(e=>e.value),
          }
        ],
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: res.map(e=>e.label)
        }
      };
    });
  }

}
