import { Component } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';
import { DataDisplayComponent } from '../data-display/data-display.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SvgComponent, DataDisplayComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
