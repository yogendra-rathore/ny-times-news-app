import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserAuthService } from './user-auth.service';

describe('UserAuthService', () => {
  let service: UserAuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserAuthService]
    });

    service = TestBed.inject(UserAuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call post method for sign in with the correct URL and payload for generating token', () => {
    const testData = { email: 'test@example.com', password: 'testPassword' };
    const url = 'http://localhost:8000/auth/login';

    service.getJwtToken(testData).subscribe();

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('skip')).toBe('true');
    expect(req.request.body).toEqual(testData);

    req.flush({ token: 'testToken' });
  });

  it('should call refreshJwtToken with the correct URL and data for token updation', () => {
    const testData = { refreshToken: 'testRefreshToken' };
    const url = 'http://localhost:8000/auth/login';

    service.refreshJwtToken(testData).subscribe();

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('skip')).toBe('true');
    expect(req.request.body).toEqual(testData);

    req.flush({ token: 'testToken' });
  });

  it('should call api to register with the correct URL and data for registerUser', () => {
    const testData = {
      email: 'test@example.com',
      password: 'testPassword',
      name: 'Test User',
      org: 'Test Org'
    };
    const url = 'http://localhost:8000/auth/signup';

    service.registerUser(testData).subscribe();

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('skip')).toBe('true');
    expect(req.request.body).toEqual(testData);

    req.flush({ message: 'User registered successfully' });
  });
});
