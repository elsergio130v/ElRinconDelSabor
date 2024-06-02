import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '../../services/authService.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HeaderComponent,RouterLinkWithHref,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit{


  public authservice = inject(AuthService);
  username:any = "log in"; 


  ngOnInit() {

  }  

  onDataChange(newData: any): void {
    // Aquí maneja el cambio de datos
    console.log('Data changed:', newData);
  }
  

}

