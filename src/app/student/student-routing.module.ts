import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentPage } from './student.page';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: '',
    component: StudentPage
  },
  {
    path: 'add',
    component: AddComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentPageRoutingModule {}
