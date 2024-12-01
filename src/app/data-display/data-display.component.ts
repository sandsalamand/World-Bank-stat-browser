
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
    gdp: string = '';

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
        //Set this as soon as the first packet arrives so that the user knows what's going on
        this.headerStr = "Loading data for " + data.name;

        //Blank previous data out
        this.capitalCity = ' ';
        this.id = ' '; 
        this.region = ' ';
        this.incomeLevel = ' ';
        this.incomeLevel = ' ';
        this.population = ' ';
        this.gdp = ' ';

        //Wait until the advanced data arrives to set all of the data at the same time.
        //The reason we can't request the advanced data at the same time as the simple data is that the advanced data API requires the 3-letter country code,
        //which is provided by the simple country API call using the 2-letter iso2code from the svg file
        this.apiService.getAdvancedCountryData(data.id).subscribe((response) =>
        {
            //Set simple data from previous request
            this.headerStr = data.name + ' Statistics';
            this.capitalCity = data.capitalCity;
            this.id = data.id; 
            this.region = data.region.value;
            this.incomeLevel = data.incomeLevel.value;

            //Set advanced data from the most recent request
            this.population = response.population;
            this.gdp = response.gdp;
        });
    }
}