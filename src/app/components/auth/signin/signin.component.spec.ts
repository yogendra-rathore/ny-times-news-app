import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthResponse } from 'src/app/models/jwtResponse';
import { UserAuthService } from 'src/app/services/authService/user-auth.service';
import { SharedService } from 'src/app/services/shared/shared.service';

import { SigninComponent } from './signin.component';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let authServiceSpy: jasmine.SpyObj<UserAuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceMock = jasmine.createSpyObj('UserAuthService', ['getJwtToken']);
    const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [SigninComponent],
      imports:[FormsModule],
      providers: [
        { provide: UserAuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        SharedService 
      ]
    });

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(UserAuthService) as jasmine.SpyObj<UserAuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle showPassword on showPass()', () => {
    expect(component.showPassword).toBeFalse();
    component.showPass();
    expect(component.showPassword).toBeTrue();
    component.showPass();
    expect(component.showPassword).toBeFalse();
  });

  it('should call getJwtToken on getLoginDetails once user logged in to get token', () => {
    const testData = { email: 'test@example.com' };
    authServiceSpy.getJwtToken.and.returnValue(of({ access_token: 'test_token' } as AuthResponse));

    component.getLoginDetails(testData);

    expect(authServiceSpy.getJwtToken).toHaveBeenCalledWith(testData);
  });

  it('should set token and redirect to news-articles on successful authentication', () => {
    const testData = { email: 'test@example.com' };
    authServiceSpy.getJwtToken.and.returnValue(of({ access_token: 'test_token' } as AuthResponse));

    component.getLoginDetails(testData);

    expect(localStorage.getItem('token')).toBe('test_token');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('news-articles');
  });

  it('should set errorAlert and errorMessage on authentication error', () => {
    const testData = { email: 'test@example.com' };
    authServiceSpy.getJwtToken.and.returnValue(throwError('Authentication error'));

    component.getLoginDetails(testData);

    expect(component.errorAlert).toBeTrue();
    expect(component.errorMessage).toBeTrue();
  });
});
