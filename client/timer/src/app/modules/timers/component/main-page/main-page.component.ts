import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { TimerInterface } from '../../models/timer.model';
import {
  CountdownComponent,
  CountdownConfig,
  CountdownEvent,
} from 'ngx-countdown';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
  // private msInMinute = 1000 * 60;
  //TODO: Make a service for timers
  // public timerS: TimerInterface = {
  //   total: this.msInMinute * 1,
  //   current: 0,
  //   format: (): string =>
  //     this.timeFormatter(this.timerS.total, this.timerS.current),
  //   intervalId: null,
  // };
  // public timerM: TimerInterface = {
  //   total: this.msInMinute * 5,
  //   current: 0,
  //   format: (): string =>
  //     this.timeFormatter(this.timerM.total, this.timerM.current),
  //   intervalId: null,
  // };
  // public timerL: TimerInterface = {
  //   total: this.msInMinute * 25,
  //   current: 0,
  //   format: (): string =>
  //     this.timeFormatter(this.timerL.total, this.timerL.current),
  //   intervalId: null,
  // };
  // public config: CountdownConfig = { leftTime: 5 * 60, demand: true };
  // public timerS = {
  //   config: {
  //     leftTime: 1 * 60,
  //     demand: true,
  //     prettyText: (text: string): string => {
  //       const [minutes, seconds] = text.split(':').map(val => parseInt(val));
  //       const leftTime = minutes * 60 + seconds;
  //       const totalTime = this.timerS.config.leftTime;
  //       const percent = ((totalTime - leftTime) * 100) / totalTime;
  //       this.timerS.percent = Math.round(percent);
  //       this.timerS.currentTime = text;
  //       this.cdr.detectChanges();
  //       return text;
  //     },
  //     format: 'mm:ss',
  //   },
  //   isActive: false,
  //   percent: 0,
  //   currentTime: '01:00',
  //   progressFormat: (): string => {
  //     return this.timerS.currentTime;
  //   },
  // };
  // constructor(private cdr: ChangeDetectorRef) {}
  // public handleEvent(event: CountdownEvent, cd: CountdownComponent): void {
  //   console.log(event);
  //   console.log(cd);
  // }
  // public startTimer(timer: TimerInterface): void {
  //   timer.intervalId = setInterval(() => {
  //     if (timer.current < timer.total) {
  //       timer.current += 1000;
  //       this.cdr.detectChanges();
  //       return;
  //     } else if (timer.intervalId) {
  //       clearInterval(timer.intervalId);
  //     }
  //   }, 1000);
  // }
  // private timeFormatter(total: number, current: number): string {
  //   const rest = new Date(total - current);
  //   const minutes = String(rest.getMinutes()).padStart(2, '0');
  //   const seconds = String(rest.getSeconds()).padStart(2, '0');
  //   return `${minutes}:${seconds}`;
  // }
}
