import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent {
  private timerSSeries = [65, 59, 80, 81, 56, 55, 40];
  private timerMSeries = [28, 48, 40, 19, 86, 27, 90];
  private timerLSeries = [1, 0, 1, 2, 0, 0, 1];

  public timerSTotalUse = this.timerSSeries.reduce((acc, val) => acc + val);
  public timerMTotalUse = this.timerMSeries.reduce((acc, val) => acc + val);
  public timerLTotalUse = this.timerLSeries.reduce((acc, val) => acc + val);

  constructor(private router: Router) {}

  public goToMainPage(): void {
    this.router.navigate(['']);
  }
}
