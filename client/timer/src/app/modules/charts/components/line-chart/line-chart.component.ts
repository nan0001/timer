import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent {
  //TODO: via input
  private timerSSeries = [65, 59, 80, 81, 56, 55, 40];
  private timerMSeries = [28, 48, 40, 19, 86, 27, 90];
  private timerLSeries = [1, 0, 1, 2, 0, 0, 1];

  private labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012']; //dates on x axis

  public chartData: ChartConfiguration<'line'>['data'] = {
    labels: this.labels,
    datasets: [
      {
        label: '1-minute timer',
        data: this.timerSSeries,
      },
      {
        label: '5-minute timer',
        data: this.timerMSeries,
      },
      {
        label: '25-minute timer',
        data: this.timerLSeries,
      },
    ],
  };

  public chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    elements: {
      point: {
        hoverRadius: 5,
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };
}
