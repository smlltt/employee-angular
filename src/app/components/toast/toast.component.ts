import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  toastService = inject(ToastService);
  toasts = this.toastService.toasts;

  removeToast(id: number) {
    this.toastService.removeToast(id);
  }
}
