import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AntDesignModule } from '../ant-design/ant-design.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, AntDesignModule, RouterModule, HttpClientModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
