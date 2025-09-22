import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryProviderPage } from './history-provider.page';

describe('HistoryProviderPage', () => {
  let component: HistoryProviderPage;
  let fixture: ComponentFixture<HistoryProviderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
