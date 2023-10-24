import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOfficeComponent } from './admin-office.component';

describe('AdminOfficeComponent', () => {
  let component: AdminOfficeComponent;
  let fixture: ComponentFixture<AdminOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOfficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
