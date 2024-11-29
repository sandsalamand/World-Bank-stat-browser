import { Component, ElementRef, OnInit, Output } from '@angular/core';
import {AfterViewInit, Directive, QueryList, ViewChildren} from '@angular/core';
import { ApiHttpService } from '../api-http.service';

@Component({
  selector: 'app-svg',
  standalone: true,
  imports: [],
  templateUrl: './svg.component.html',
  styleUrl: './svg.component.css',
  providers: [ApiHttpService]
})
export class SvgComponent implements AfterViewInit {
    @ViewChildren(ElementRef) svgChildren!: QueryList<ElementRef>;

    hoveredPathElement?: Element = undefined;
    selectedShapeFillColor = 'green';

    @Output() selectedCountryData: string = '';

    constructor(private apiService: ApiHttpService) {}

    mapClicked(e: MouseEvent): void {
        console.log('map clicked at pos ' + e.clientX);
        //let topMostElement = document.elementFromPoint(e.clientX, e.clientY);
        if(this.hoveredPathElement)
        {
            let countryName = this.hoveredPathElement.getAttribute('name');
            let countryId = this.hoveredPathElement.getAttribute('id');
            console.log("Clicked on " + countryName + ", id " + countryId);
            this.apiService.getCountryData(countryId!).subscribe((response: any) => {
                this.selectedCountryData = response;
                console.log("response was " + response);
            });
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
            topMostElement.setAttribute('fill', 'green');
            this.hoveredPathElement = topMostElement;
        }
        else
        {
            this.hoveredPathElement = undefined;
        }
    }

    ngAfterViewInit(): void {

        // console.log("svgChildren is " + this.svgChildren);
        // console.log("changes is " + this.svgChildren.changes)

        // console.log("len is " + this.svgChildren.toArray().length)

        // let pathElements = document.getElementsByTagName('path');

        // this.svgChildren.changes.subscribe((r) => {
        //     this.addAngularDataBindingAttributes(r);
        // });

        //console.log("len is " + svgPaths.length);

        // for (let i = 0; i < pathElements.length; i++) {
        //    let svgPath = pathElements[i];

        //    svgPath.setAttribute('fill', 'green');
        // }
        
    }

    // addAngularDataBindingAttributes(elementRef: ElementRef)
    // {
    //     elementRef.nativeElement.setAttribute('[attr.fill]', 'selectedShapeFillColor');
    //     elementRef.nativeElement.setAttribute('(click)', 'changeColor()');
    //     console.log("binding");
    // }

    changeColor(): void {
        console.log("click received");
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        this.selectedShapeFillColor = `rgb(${r}, ${g}, ${b})`;
    }
}
