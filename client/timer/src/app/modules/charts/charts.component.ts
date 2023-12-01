import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TimerService } from '../core/services/timer.service';
import { TimersResponseInterface } from '../core/models/timer-response.model';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent implements OnInit {
  public timers$!: Observable<TimersResponseInterface>;

  constructor(
    private router: Router,
    private timerService: TimerService
  ) {}

  public ngOnInit(): void {
    this.timers$ = this.timerService.getAllTimers();
  }

  public goToMainPage(): void {
    this.router.navigate(['']);
  }
}
