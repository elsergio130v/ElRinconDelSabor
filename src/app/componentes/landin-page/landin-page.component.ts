import { Component } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-landin-page',
  standalone: true,
  imports: [RouterLinkWithHref,RouterLinkActive],
  templateUrl: './landin-page.component.html',
  styleUrl: './landin-page.component.css'
})
export class LandinPageComponent {

}
