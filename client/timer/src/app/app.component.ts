import { Component, HostListener, OnInit } from '@angular/core';
import { NotificationService } from './modules/core/services/notification.service';
import { AuthService } from './modules/core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'timer';

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.notificationService.checkNotificationPermission();
  }

  @HostListener('window:beforeunload')
  beforeUnloadHandler() {
    this.authService.saveCredsInLocalStorage();
  }
}
