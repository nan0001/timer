import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerItemComponent } from './timer-item.component';

describe('TimerItemComponent', () => {
  let component: TimerItemComponent;
  let fixture: ComponentFixture<TimerItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimerItemComponent]
    });
    fixture = TestBed.createComponent(TimerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
