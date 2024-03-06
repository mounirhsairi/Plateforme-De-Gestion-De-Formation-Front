import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { TeteComponent } from './tete/tete.component';



@NgModule({
  declarations: [
    SideNavComponent,
    NavBarComponent,
    TeteComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    SideNavComponent,
    NavBarComponent,
    TeteComponent
  ]
})
export class SharedModule { }
