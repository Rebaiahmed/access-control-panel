import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserManagementService } from '../../services/user-management.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, filter, map, Observable, switchMap } from 'rxjs';
import { User } from '../../models/user-management.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Permission, Role, RoleManagementService } from '@access-control-panel/role-management';

@Component({
  selector: 'lib-user-detail.component',
  imports: [ CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,],
  templateUrl: './user-detail.component.component.html',
  styleUrl: './user-detail.component.component.scss',
})
export class UserDetailComponentComponent implements OnInit {


  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserManagementService);
  private roleService = inject(RoleManagementService);
  private destroyRef = inject(DestroyRef); 

  user = signal<User | undefined>(undefined);
  assignedRole = signal<Role | undefined>(undefined);
  assignedPermissionsByCategory = signal<{ category: string; permissions: Permission[] }[]>([]);
  isLoading = signal(true);
  error = signal<string | undefined>(undefined);

    ngOnInit(): void {
     this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        filter(id => !!id),
        switchMap(userId => this.fetchUserDetailsAndRole(userId!)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: data => {
          this.user.set(data.user);
          this.assignedRole.set(data.role);
          this.isLoading.set(false);
        },
        error: err => {
          this.error.set(err.message || 'Failed to load user details.');
          this.isLoading.set(false);
          this.router.navigate(['/users']);
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }

   private fetchUserDetailsAndRole(userId: string): Observable<{ user: User, role: Role | undefined }> {
    this.isLoading.set(true);
    this.error.set(undefined);
    return combineLatest([
      this.userService.getUserById(userId),
      this.roleService.getRoles()
    ]).pipe(
      map(([user, allRoles]) => {
        if (!user) {
          throw new Error('User not found.');
        }
        const role = allRoles.find(r => r.id === user.roleId);
        return { user, role };
      })
    );
  }
}
