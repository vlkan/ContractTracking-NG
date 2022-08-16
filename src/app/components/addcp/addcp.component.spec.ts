import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcpComponent } from './addcp.component';

describe('AddcpComponent', () => {
  let component: AddcpComponent;
  let fixture: ComponentFixture<AddcpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
