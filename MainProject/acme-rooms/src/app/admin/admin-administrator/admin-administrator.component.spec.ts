import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdministratorComponent } from './admin-administrator.component';

describe('AdminAdministratorComponent', () => {
  let component: AdminAdministratorComponent;
  let fixture: ComponentFixture<AdminAdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAdministratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
