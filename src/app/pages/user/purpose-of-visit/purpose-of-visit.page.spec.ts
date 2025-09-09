import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurposeOfVisitPage } from './purpose-of-visit.page';

describe('PurposeOfVisitPage', () => {
  let component: PurposeOfVisitPage;
  let fixture: ComponentFixture<PurposeOfVisitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PurposeOfVisitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
