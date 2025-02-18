import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  private toastIdCounter = 0;
  toasts$ = this.toastsSubject.asObservable();

  constructor() {}

  show(toast: Omit<Toast, 'id'>) {
    const newToast: Toast = {
      id: this.toastIdCounter++, // Assign a unique ID
      ...toast,
    };

    const toasts = this.toastsSubject.getValue();
    this.toastsSubject.next([...toasts, newToast]);

    setTimeout(() => this.removeToast(newToast.id), newToast.duration || 2000);
  }

  removeToast(id: number) {
    const toasts = this.toastsSubject.getValue();
    this.toastsSubject.next(toasts.filter((t) => t.id !== id));
  }

  clear() {
    this.toastsSubject.next([]);
  }
}
