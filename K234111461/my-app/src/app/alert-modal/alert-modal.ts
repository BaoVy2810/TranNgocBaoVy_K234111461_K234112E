import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  standalone: false,
  templateUrl: './alert-modal.html',
  styleUrl: './alert-modal.css',
})
export class AlertModalComponent {
  @Input() message = '';
  @Input() visible = false;
  @Output() closed = new EventEmitter<void>();

  onOk() {
    this.closed.emit();
  }

  onBackdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('alert-overlay')) {
      this.onOk();
    }
  }
}
