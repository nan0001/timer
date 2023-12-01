import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TIMER_MINUTES } from '../../constants/timer-minutes.constant';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
  public timerMinutes = TIMER_MINUTES;

  constructor(private router: Router) {}

  public goToCharts(): void {
    this.router.navigate(['charts']);
  }
}
