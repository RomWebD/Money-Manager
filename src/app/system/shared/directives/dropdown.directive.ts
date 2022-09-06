import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[mm-dropdown]',
})
export class DropdownDirecive {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') onClick() {
    this.isOpen = !this.isOpen;
  }
}
