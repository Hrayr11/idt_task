import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/service/auth.guard.service';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'system',
    canActivate: [AuthGuard],
    loadChildren: () => import('./system/system.module').then(m => m.SystemModule)
  },
  {path: 'not_found',
    canActivate: [AuthGuard],
    component: NotFoundComponent},
  {path: '**', redirectTo: 'not_found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
