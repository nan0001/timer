import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent implements OnInit {
  @Input() timerS: number[] = [];
  @Input() timerM: number[] = [];
  @Input() timerL: number[] = [];

  private currentDate = Date.now();
  private startDate = this.currentDate - 30 * 24 * 60 * 60 * 1000; // -30 days
  private labels = this.createDatesLabels(this.startDate, this.currentDate); //dates on x axis

  public chartData!: ChartConfiguration<'line'>['data'];

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
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
        type: 'linear',
        beginAtZero: true,
      },
    },
  };

  public ngOnInit(): void {
    this.chartData = {
      labels: this.labels,
      datasets: [
        {
          label: '1-minute timer',
          data: this.getDataArray(this.timerS),
        },
        {
          label: '5-minute timer',
          data: this.getDataArray(this.timerM),
        },
        {
          label: '25-minute timer',
          data: this.getDataArray(this.timerL),
        },
      ],
    };
  }

  private createDatesLabels(start: number, current: number): string[] {
    const datesArr: number[] = [];

    for (let i = start; i <= current; i += 24 * 60 * 60 * 1000) {
      datesArr.push(i);
    }

    return this.getStringDatesArray(datesArr);
  }

  private getStringDatesArray(array: number[]): string[] {
    return array.map(val => {
      const date = new Date(val);

      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    });
  }

  private getDataArray(timerArray: number[]): number[] {
    const stringArray = this.getStringDatesArray(timerArray);

    return this.labels.map(val => {
      return stringArray.filter(date => date === val).length;
    });
  }
}
