import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAppointmentsDetailsPage } from './my-appointments-details.page';

describe('MyAppointmentsDetailsPage', () => {
  let component: MyAppointmentsDetailsPage;
  let fixture: ComponentFixture<MyAppointmentsDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAppointmentsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
