import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './component/main-page/main-page.component';
import { AntDesignModule } from '../ant-design/ant-design.module';
import { CountdownModule } from 'ngx-countdown';
import { TimerItemComponent } from './component/timer-item/timer-item.component';

@NgModule({
  declarations: [MainPageComponent, TimerItemComponent],
  imports: [CommonModule, AntDesignModule, CountdownModule],
  exports: [MainPageComponent],
})
export class TimersModule {}
