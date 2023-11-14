import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoReservaComponent } from './no-reserva.component';

describe('NoReservaComponent', () => {
  let component: NoReservaComponent;
  let fixture: ComponentFixture<NoReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoReservaComponent]
    });
    fixture = TestBed.createComponent(NoReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
