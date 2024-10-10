import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    userServiceMock = jasmine.createSpyObj('UserService', ['userLogin', 'adminLogin', 'setUserLoginStatus', 'setCurrentUser', 'setLoginType']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should submit user login successfully', () => {
    // Arrange
    component.userCredentials.patchValue({
      loginType: 'user',
      email: 'user@example.com',
      password: 'password123'
    });
    
    const mockResponse = {
      message: 'Login Success',
      newUser: {
        token: 'mockToken',
        userfromdb: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com', // Add other required fields
          loginId: 'john.doe',
          password: '', // or appropriate value
          confirmPwd: '', // or appropriate value
          contactNum: '1234567890'
        }
      }
    };
  
    userServiceMock.userLogin.and.returnValue(of(mockResponse));
  
    // Act
    component.onSubmitUser();
  
    // Assert
    expect(localStorage.getItem('token')).toBe('mockToken');
    expect(userServiceMock.setUserLoginStatus).toHaveBeenCalledWith(true);
    expect(userServiceMock.setCurrentUser).toHaveBeenCalledWith(mockResponse.newUser.userfromdb);
    expect(userServiceMock.setLoginType).toHaveBeenCalledWith('user');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/bookTicket']);
  });
  

  it('should handle user login failure', () => {
    // Arrange
    component.userCredentials.patchValue({
      loginType: 'user',
      email: 'user@example.com',
      password: 'password123'
    });
    
    const mockResponse = { message: 'Invalid credentials' };
    userServiceMock.userLogin.and.returnValue(of(mockResponse));

    // Act
    component.onSubmitUser();

    // Assert
    expect(component.userCredentialsError.userCredErrStatus).toBeTrue();
    expect(component.userCredentialsError.userCredErrMsg).toBe('Invalid credentials');
  });

  it('should submit admin login successfully', () => {
    // Arrange
    component.userCredentials.patchValue({
      loginType: 'admin',
      email: 'admin@example.com',
      password: 'adminPassword'
    });
    
    const mockResponse = {
      message: 'Login Success',
      newAdmin: {
        token: 'mockToken',
        userfromdb: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com', // Add other required fields
          loginId: 'john.doe',
          password: '', // or appropriate value
          confirmPwd: '', // or appropriate value
          contactNum: '1234567890'
        }
      }
    };
  
    userServiceMock.userLogin.and.returnValue(of(mockResponse));
  
    // Act
    component.onSubmitUser();

    // Assert
    expect(localStorage.getItem('token')).toBe('adminToken');
    expect(userServiceMock.setUserLoginStatus).toHaveBeenCalledWith(true);
    expect(userServiceMock.setCurrentUser).toHaveBeenCalledWith(mockResponse.newAdmin.userfromdb);
    expect(userServiceMock.setLoginType).toHaveBeenCalledWith('admin');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/addMovie']);
  });

  it('should handle admin login failure', () => {
    // Arrange
    component.userCredentials.patchValue({
      loginType: 'admin',
      email: 'admin@example.com',
      password: 'adminPassword'
    });
    
    const mockResponse = { message: 'Invalid admin credentials' };
    userServiceMock.adminLogin.and.returnValue(of(mockResponse));

    // Act
    component.onSubmitUser();

    // Assert
    expect(localStorage.getItem('token')).toBeNull(); // Ensure token is not set
    expect(userServiceMock.setUserLoginStatus).not.toHaveBeenCalled();
  });

  it('should handle error during user login', () => {
    // Arrange
    component.userCredentials.patchValue({
      loginType: 'user',
      email: 'user@example.com',
      password: 'password123'
    });
    
    userServiceMock.userLogin.and.returnValue(throwError('Login error'));

    // Act
    component.onSubmitUser();

    // Assert
    expect(console.log).toHaveBeenCalledWith('err in user login', 'Login error');
  });

  it('should handle error during admin login', () => {
    // Arrange
    component.userCredentials.patchValue({
      loginType: 'admin',
      email: 'admin@example.com',
      password: 'adminPassword'
    });
    
    userServiceMock.adminLogin.and.returnValue(throwError('Login error'));

    // Act
    component.onSubmitUser();

    // Assert
    expect(console.log).toHaveBeenCalledWith('err in admin login', 'Login error');
  });
});
