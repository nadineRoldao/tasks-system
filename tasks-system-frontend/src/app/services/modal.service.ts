import { DOCUMENT } from '@angular/common';
import {
    ComponentFactoryResolver,
    Inject,
    Injectable,
    Injector,
    TemplateRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private modalNotifier?: Subject<string>;
    constructor(
        private resolver: ComponentFactoryResolver,
        private injector: Injector,
        @Inject(DOCUMENT) private document: Document
    ) { }

    open(options?: { size?: string; title?: string }) {
        const modalComponentFactory = this.resolver.resolveComponentFactory(
            ModalComponent
        );
        const modalComponent = modalComponentFactory.create(this.injector);

        modalComponent.instance.size = options?.size;
        modalComponent.instance.title = options?.title;
        modalComponent.instance.closeEvent.subscribe(() => this.closeModal());
        modalComponent.instance.submitEvent.subscribe(() => this.submitModal());

        modalComponent.hostView.detectChanges();

        this.document.body.appendChild(modalComponent.location.nativeElement);
        this.modalNotifier = new Subject();
        return this.modalNotifier?.asObservable();
    }

    closeModal() {
        this.modalNotifier?.complete();
    }

    submitModal() {
        this.modalNotifier?.next('confirm');
        this.closeModal();
    }
}