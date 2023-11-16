import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { NgChartsModule } from 'ng2-charts';
import { AntDesignModule } from '../ant-design/ant-design.module';
import { LineChartComponent } from './components/line-chart/line-chart.component';

@NgModule({
  declarations: [ChartsComponent, LineChartComponent],
  imports: [CommonModule, ChartsRoutingModule, NgChartsModule, AntDesignModule],
})
export class ChartsModule {}
