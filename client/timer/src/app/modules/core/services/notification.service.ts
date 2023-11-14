import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private areNotificationsSupported = true;

  constructor(private notification: NzNotificationService) {}

  public checkNotificationPermission(): void {
    if (!('Notification' in window)) {
      // Check if the browser supports notifications
      this.notification.warning(
        'Desktop notifications are not supported',
        `You will not be able to see notifications outside of the browser when the timer stops`
      );
      this.areNotificationsSupported = false;
      return;
    }

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }

  public notify(title: string, message: string): void {
    const isAccessGranted = Notification.permission === 'granted';
    if (this.areNotificationsSupported && isAccessGranted) {
      const notification = new Notification(title, {
        body: message,
        badge: `${location.origin}/favicon.ico`,
        requireInteraction: false,
      });
      return;
    }

    this.notification.success(title, message);
  }
}
