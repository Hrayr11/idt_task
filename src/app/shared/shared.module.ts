import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PhoneNumberSelectComponent} from './component/phone-number-select/phone-number-select.component';
import {LangComponent} from './component/lang/lang.component';



@NgModule({
  declarations: [PhoneNumberSelectComponent,LangComponent],
  imports: [
    CommonModule
  ],
  exports:[PhoneNumberSelectComponent,LangComponent]
})
export class SharedModule { }
