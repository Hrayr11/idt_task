import {Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild} from '@angular/core';
import {CountryCodeItemInterface} from '../../interface/country-code.interface';

@Component({
  selector: 'app-phone-number-select',
  templateUrl: './phone-number-select.component.html',
  styleUrl: './phone-number-select.component.scss'
})
export class PhoneNumberSelectComponent {
  @Input() options: CountryCodeItemInterface[];
  @Output() optionSelected: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('closeButton') closeButtonEl: ElementRef;

  selectedOption: number;
  dropdownOpen: boolean = false;

  @HostListener('document:click', ['$event'])
  onGlobalClick(event:MouseEvent): void {
    if (!this.closeButtonEl?.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }

  toggleDropdown(event:MouseEvent) {
    event.stopPropagation()
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: number) {
    this.selectedOption = option;
    this.optionSelected.emit(option);
    this.dropdownOpen = false;
  }

  closeInfoContainer() {
    this.dropdownOpen = false
  }
}
