import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[iterateNTimes]',
    standalone: true,
})
export class IterateNTimesDirective {
    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}

    @Input('iterateNTimes') set count(n: number) {
        this.viewContainer.clear();
        for (var i = 0; i < n; i++) {
            this.viewContainer.createEmbeddedView(this.templateRef, { index: i });
        }
    }
}
