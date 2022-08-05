import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklistCalendarComponent } from './worklist-calendar.component';

describe('WorklistCalendarComponent', () => {
  let component: WorklistCalendarComponent;
  let fixture: ComponentFixture<WorklistCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorklistCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorklistCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
