import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appVerificationFormulaire]'
})
export class VerificationFormulaireDirective {

  private el : ElementRef;

  constructor(el: ElementRef) { 
    this.el =el;
  }

  @HostListener('change') onChange(){
    this.el.nativeElement.style.backgroundColor = this.el.nativeElement.checkValidity() ? null: 'purple';
  }
}
