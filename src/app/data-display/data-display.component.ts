
import { NgForOf } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.css'
})
export class DataDisplayComponent implements OnInit  {
    @Input() pages = [];

    constructor() {}
  
    ngOnInit() {}
}