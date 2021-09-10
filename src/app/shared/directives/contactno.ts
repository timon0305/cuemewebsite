import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[ContactNo]'
})
export class ContactNoDirective {
    private regex = /^[0-9-+/()]*$/;

    constructor(private el: ElementRef) { }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (["Backspace", "Tab", "End", "Home"].indexOf(event.key) !== -1)
            return;

        let current: string = this.el.nativeElement.value;
        let next: string = current.concat(event.key);
        if (next && !this.regex.test(next))
            event.preventDefault();
    }
}