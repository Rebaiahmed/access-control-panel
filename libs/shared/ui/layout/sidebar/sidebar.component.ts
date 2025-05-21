import { Component, inject, ViewChild } from '@angular/core';
import { AuthStore } from '@access-control-panel/authentication';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-sidebar',
  imports: [CommonModule,MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  authStore = inject(AuthStore);
  currentUser = this.authStore.currentUser;
  isSuperAdmin = this.authStore.isSuperAdmin;

  logout() {
   this.authStore.logout();
  }
}
