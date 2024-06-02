import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject, signal } from '@angular/core';
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
  @Input({ required: true }) item!: any;

  ngOnInit() {

  }  
  

}

