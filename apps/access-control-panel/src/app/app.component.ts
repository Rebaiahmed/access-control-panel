import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '@access-control-panel/authentication';
import { FooterComponent, SidebarComponent } from '@access-control-panel/ui';



@Component({
  imports: [LoginComponent, FooterComponent, SidebarComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'access-control-panel';
}
