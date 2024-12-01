import { Component, ElementRef, OnInit, Output } from '@angular/core';
import {AfterViewInit, Directive, QueryList, ViewChildren} from '@angular/core';
import { ApiHttpService, SimpleData, WorldBankResponse } from '../api-http.service';

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
        this.apiService.apiRequestResult.subscribe((data: SimpleData) => {
        });
    }

    mapClicked(e: MouseEvent): void {
        if(this.hoveredPathElement)
        {
            let countryName = this.hoveredPathElement.getAttribute('name');
            let countryId = this.hoveredPathElement.getAttribute('id');
            console.log("Clicked on " + countryName + ", id " + countryId);
            this.apiService.getSimpleCountryData(countryId!);
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
