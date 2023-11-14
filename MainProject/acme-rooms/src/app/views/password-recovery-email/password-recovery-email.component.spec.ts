import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { Observable } from 'node_modules/rxjs';
import { RequestService } from './../../services/request.service';
import { UserServiceService } from 'src/app/user.service.service';
import { UserService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { PasswordRecoveryEmailComponent } from './password-recovery-email.component';

describe('PasswordRecoveryEmailComponent', () => {
  let component: PasswordRecoveryEmailComponent;
  let fixture: ComponentFixture<PasswordRecoveryEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordRecoveryEmailComponent]
    });
    fixture = TestBed.createComponent(PasswordRecoveryEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
