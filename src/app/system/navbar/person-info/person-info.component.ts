import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrl: './person-info.component.css'
})
export class PersonInfoComponent {
  @Output() valueChanged = new EventEmitter<boolean>();

  closeInfoContainer() {
    this.valueChanged.emit(false)
  }
}
