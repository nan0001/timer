import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    NzIconModule,
    NzButtonModule,
    NzTypographyModule,
    NzCardModule,
    NzFormModule,
    NzPageHeaderModule,
    NzInputModule,
    NzProgressModule,
  ],
})
export class AntDesignModule {}
