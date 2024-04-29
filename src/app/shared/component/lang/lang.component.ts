import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  styleUrl: './lang.component.scss'
})
export class LangComponent {

  @Input() className:string
  constructor() {
  }
}
