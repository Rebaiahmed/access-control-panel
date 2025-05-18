import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-home',
  imports: [CommonModule,MatCardModule,MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
