import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate,redirectUnauthorizedTo,redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectLoggedInToStudent = ()=> redirectLoggedInTo(['student'])
const redirectLoggedInToSponsor = ()=> redirectLoggedInTo(['sponsor'])
const redirectUnauthorizedToLogin = ()=> redirectUnauthorizedTo(['auth'])
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },  
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then( m => m.StudentPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'sponsor',
    loadChildren: () => import('./sponsor/sponsor.module').then( m => m.SponsorPageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'guide',
    loadChildren: () => import('./guide/guide.module').then( m => m.GuidePageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'accounting',
    loadChildren: () => import('./accounting/accounting.module').then( m => m.AccountingPageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'invoice',
    loadChildren: () => import('./invoice/invoice.module').then( m => m.InvoicePageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule),
    ...canActivate(redirectLoggedInToStudent)
    // ...canActivate(redirectLoggedInToSponsor)
  },
  {
    path: '**',
    loadChildren: () => import('./student/student.module').then( m => m.StudentPageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
