
import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ApiHttpService, MainData } from '../api-http.service';
import { JsonToKeysPipe } from '../json-to-keys.pipe';

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [NgFor, NgIf, JsonToKeysPipe],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.css',
})
export class DataDisplayComponent implements AfterViewInit  {

    constructor(private apiService: ApiHttpService) {}
  
    readonly defaultHeaderStr: string = "Click a country to see statistics";

    headerStr: string = this.defaultHeaderStr;
    id: string = '';
    region: string = '';
    incomeLevel: string = '';
    capitalCity: string = '';

    data: MainData | undefined = undefined;

    ngAfterViewInit(): void {
        
    }

    ngOnInit()
    {
        this.apiService.apiRequestResult.subscribe((data: MainData) => { 
            console.log("Data is " + data);
            this.headerStr = data.name + ' Statistics';
            this.capitalCity = data.capitalCity;
            this.id = data.id; 
            this.region = data.region.value;
            this.incomeLevel = data.incomeLevel.value;
            this.data = data;
        });
    }
}