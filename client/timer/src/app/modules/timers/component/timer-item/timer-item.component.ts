import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { TIMER_STATUS } from '../../models/timer.model';

@Component({
  selector: 'app-timer-item',
  templateUrl: './timer-item.component.html',
  styleUrls: ['./timer-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerItemComponent implements OnInit {
  @Input({ required: true }) minutesNumber = 1;

  public TIMER_STATUS = TIMER_STATUS;
  public progressPercent = 0;
  public config!: CountdownConfig;
  public status: TIMER_STATUS = TIMER_STATUS.Clean;

  private totalTime = 0;

  @ViewChild('cd', { static: false }) private countdown!: CountdownComponent;

  constructor(private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.totalTime = this.minutesNumber * 60;
    this.config = {
      leftTime: this.totalTime,
      demand: true,
      prettyText: this.getProgressPercent.bind(this),
      format: 'mm:ss',
    };
  }

  public toggleTimer(): void {
    switch (this.status) {
      case TIMER_STATUS.Clean:
        this.countdown.begin();
        this.status = TIMER_STATUS.Started;
        break;
      case TIMER_STATUS.Started:
        this.countdown.pause();
        this.status = TIMER_STATUS.Paused;
        break;
      case TIMER_STATUS.Paused:
        this.countdown.resume();
        this.status = TIMER_STATUS.Started;
        break;
    }
  }

  public restartTimer(): void {
    this.status = TIMER_STATUS.Clean;
    this.countdown.restart();
  }

  private getProgressPercent(text: string): string {
    const [minutes, seconds] = text.split(':').map(val => parseInt(val));
    const leftTime = minutes * 60 + seconds;
    const percent = ((this.totalTime - leftTime) * 100) / this.totalTime;

    this.progressPercent = Math.round(percent);
    this.cdr.detectChanges();

    return text;
  }
}
