import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [NgClass],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() open: boolean = false;
  @Output() onConfirmEvent = new EventEmitter();
  @Output() onDismissEvent = new EventEmitter();

  onConfirm() {
    this.onConfirmEvent.emit();
  }

  onDismiss() {
    this.onDismissEvent.emit();
  }
}
