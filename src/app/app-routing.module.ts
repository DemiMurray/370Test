import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditUsersComponent } from './pages/add-edit-users/add-edit-users.component';
import { UsersComponent } from './pages/users/users.component';

/**
 * This array specifies your routes array. The paths are matched with certain components,
 * if the path matches a component, that component will be displayed on your browser as the current page.
 * Notice how add and edit call the same component, but edit takes in a parameter that will influence if 
 * the AddEditUsersComponent will be in add mode or in update mode. See the component for more.
 */
const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'add',
    component: AddEditUsersComponent
  },
  { 
    path: 'edit/:id',
    component: AddEditUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
