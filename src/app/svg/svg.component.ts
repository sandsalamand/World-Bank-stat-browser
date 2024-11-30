import { Component, ElementRef, OnInit, Output } from '@angular/core';
import {AfterViewInit, Directive, QueryList, ViewChildren} from '@angular/core';
import { ApiHttpService, MainData, WorldBankResponse } from '../api-http.service';

@Component({
  selector: 'app-svg',
  standalone: true,
  imports: [],
  templateUrl: './svg.component.html',
  styleUrl: './svg.component.css',
})
export class SvgComponent implements OnInit {

    hoveredPathElement?: Element = undefined;
    selectedShapeFillColor = 'green';

    constructor(private apiService: ApiHttpService) {}

    ngOnInit(): void {
        this.apiService.apiRequestResult.subscribe((data: MainData) => {
            console.log("response to svg.component.ts was " + data);
            console.log("id is " + data.id);
        });
    }

    mapClicked(e: MouseEvent): void {
        console.log('map clicked at pos ' + e.clientX);
        //let topMostElement = document.elementFromPoint(e.clientX, e.clientY);
        if(this.hoveredPathElement)
        {
            let countryName = this.hoveredPathElement.getAttribute('name');
            let countryId = this.hoveredPathElement.getAttribute('id');
            console.log("Clicked on " + countryName + ", id " + countryId);
            this.apiService.getCountryData(countryId!);
        }
    }

    mouseMove(e: MouseEvent): void {
        let topMostElement = document.elementFromPoint(e.clientX, e.clientY);
        if (topMostElement != this.hoveredPathElement)
        {
            this.hoveredPathElement?.removeAttribute('fill');
        }
        if (topMostElement?.tagName == 'path')
        {
            topMostElement.setAttribute('fill', this.selectedShapeFillColor);
            this.hoveredPathElement = topMostElement;
        }
        else
        {
            this.hoveredPathElement = undefined;
        }
    }
}
