
import { NgFor } from '@angular/common';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ApiHttpService, MainData } from '../api-http.service';
import { JsonToKeysPipe } from '../json-to-keys.pipe';

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [NgFor, JsonToKeysPipe],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.css',
})
export class DataDisplayComponent implements AfterViewInit  {

    constructor(private apiService: ApiHttpService) {}
  
    readonly defaultHeaderStr: string = "Click a country to see statistics";

    headerStr: string = this.defaultHeaderStr;

    id: string = '';

    data: MainData | undefined = undefined;

    ngAfterViewInit(): void {
        
    }

    ngOnInit()
    {
        this.apiService.apiRequestResult.subscribe((data: MainData) => { 
            console.log("Data is " + data);
            this.headerStr = 'Showing statistics for ' + data.name;
            this.id = data.id; 
            this.data = data;
            console.log('received response in data-display id is ' + this.id); 
        });
    }
}