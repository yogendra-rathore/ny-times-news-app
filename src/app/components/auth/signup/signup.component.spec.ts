import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { SignupComponent } from './signup.component';
import { UserAuthService } from 'src/app/services/authService/user-auth.service';

describe('SignupComponent Test Suite', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let userAuthServiceSpy: jasmine.SpyObj<UserAuthService>;

  beforeEach(() => {
    const userAuthServiceMock = jasmine.createSpyObj('UserAuthService', ['registerUser']);

    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: UserAuthService, useValue: userAuthServiceMock }]
    });

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    userAuthServiceSpy = TestBed.inject(UserAuthService) as jasmine.SpyObj<UserAuthService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the signupform correctly', () => {
    expect(component.signupform.get('email')).toBeTruthy();
    expect(component.signupform.get('name')).toBeTruthy();
    expect(component.signupform.get('org')).toBeTruthy();
    expect(component.signupform.get('password')).toBeTruthy();
  });

  it('should call userAuthService registerUser with valid form values once user click on sign up', async () => {
    const testData = {
      email: 'test@example.com',
      name: 'Test User',
      org: 'Test Org',
      password: 'testPassword'
    };

    component.signupform.setValue(testData);

    userAuthServiceSpy.registerUser.and.returnValue(of({ message: 'User created successfully' }));

    await component.userSignUp();

    expect(userAuthServiceSpy.registerUser).toHaveBeenCalledWith(testData);
  });

  it('should show alert on successful userSignUp', async () => {
    userAuthServiceSpy.registerUser.and.returnValue(of({ message: 'User created successfully' }));

    await component.userSignUp();

    expect(component.showAlert).toBeTrue();
  });

  it('should reset the form on successful userSignUp', async () => {
    userAuthServiceSpy.registerUser.and.returnValue(of({ message: 'User created successfully' }));

    await component.userSignUp();

    expect(component.signupform.value).toEqual({ email: null, name: null, org: null, password: null });
  });

  it('should handle error on userSignUp', async () => {
    userAuthServiceSpy.registerUser.and.returnValue(throwError('Error creating user'));

    await component.userSignUp();

    expect(component.showAlert).toBeFalse();
  });

  it('should reset the form on reset button click sign up page', () => {
    component.signupform.setValue({
      email: 'test@example.com',
      name: 'Test User',
      org: 'Test Org',
      password: 'testPassword'
    });

    component.resetForm();

    expect(component.signupform.value).toEqual({ email: null, name: null, org: null, password: null });
  });
});
