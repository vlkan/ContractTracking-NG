import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklistListComponent } from './worklist-list.component';

describe('WorklistListComponent', () => {
  let component: WorklistListComponent;
  let fixture: ComponentFixture<WorklistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorklistListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorklistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
