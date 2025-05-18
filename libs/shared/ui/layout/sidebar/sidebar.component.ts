import { Component, inject, ViewChild } from '@angular/core';

import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, AuthStore } from '@access-control-panel/authentication';

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
