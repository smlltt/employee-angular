import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'alert-success' | 'alert-error' | 'alert-info' | 'alert-warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastIdCounter = signal(0);
  private toastsSignal = signal<Toast[]>([]);

  get toasts() {
    return this.toastsSignal;
  }

  addToast(toast: Omit<Toast, 'id'>) {
    this.toastIdCounter.set(this.toastIdCounter() + 1);
    const newToast: Toast = {
      id: this.toastIdCounter(),
      ...toast,
    };

    this.toastsSignal.set([...this.toastsSignal(), { ...newToast }]);
    setTimeout(() => this.removeToast(newToast.id), newToast.duration || 2000);
  }

  removeToast(id: number) {
    this.toastsSignal.set(this.toastsSignal().filter((t) => t.id !== id));
  }
}
