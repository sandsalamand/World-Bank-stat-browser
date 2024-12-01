
import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ApiHttpService, SimpleData } from '../api-http.service';
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
    population: string = '';

    //Old idea
    //data: MainData | undefined = undefined;

    ngAfterViewInit(): void {
        
    }

    ngOnInit()
    {
        //For some reason, you need to bind onCountryUpdated in a lambda instead of just providing it as an argument to subscribe
        this.apiService.apiRequestResult.subscribe((data: SimpleData) => this.onCountryDataUpdated(data));
    }

    onCountryDataUpdated(data: SimpleData ) : void
    {
        console.log("Data is " + data);
        this.headerStr = data.name + ' Statistics';
        console.log("headerStr: " + this.headerStr);
        this.capitalCity = data.capitalCity;
        this.id = data.id; 
        console.log("id: " + this.id);
        this.region = data.region.value;
        this.incomeLevel = data.incomeLevel.value;
        //this.data = data;

        this.apiService.getAdvancedCountryData(data.id).subscribe((response) => { this.population = response.population });
    }
}