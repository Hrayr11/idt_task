import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SystemComponent} from "./system.component";
import {NavbarComponent} from './navbar/navbar.component';
import {MainPageComponent} from './main-page/main-page.component';
import {PersonInfoComponent} from './navbar/person-info/person-info.component';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
  {path: '', component: SystemComponent}
];

@NgModule({
  declarations: [SystemComponent, NavbarComponent, MainPageComponent, PersonInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class SystemModule {
}
