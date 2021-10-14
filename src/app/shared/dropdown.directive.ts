import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean = false;

  @HostListener('document:click', ['$event']) toggleOpen(eventData: Event) {
    this.isOpen = this.elementRef.nativeElement.contains(eventData.target)
      ? !this.isOpen
      : false;
  }

  constructor(private elementRef: ElementRef) {}
}
