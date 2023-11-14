import { Component, OnInit } from '@angular/core';
import { NotificationService } from './modules/core/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'timer';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.checkNotificationPermission();
  }
}
