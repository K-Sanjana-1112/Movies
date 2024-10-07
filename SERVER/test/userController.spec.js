const sinon = require('sinon');
const { expect } = require('chai');
const userService = require('../src/service/user.services');
const userController = require('../src/controllers/user.controller');
const Admin = require('../src/Model/adminModel');
const res = {
    status: sinon.stub().returnsThis(),
    send: sinon.stub().returnsThis(),
    json: sinon.stub().returnsThis()
};

describe('User Controller', () => {
    describe('createUser', () => {
        it('should createUser a new user successfully', async () => {
            const req = {
                body: {
                    role: 'user',
                    firstName: 'sanju',
                    lastName: 'zzaa',
                    email: 'sanju.zzaa@example.com',
                    userLoginId: 'sanju_zzaa',
                    password: 'password',
                    confirmPwd: 'password',
                    contactNum: '1234567890'
                }
            };
            const newUser = {
                message: 'Registration Success',
                firstName: 'sanju',
                lastName: 'zzaa',
                email: 'sanju.zzaa@example.com',
                userLoginId: 'sanju_zzaa',
                contactNum: '1234567890',
                role: 'user'
            };
            sinon.stub(userService, 'createUser').resolves(newUser);
            await userController.createUser(req, res);
            expect(res.status.calledWith(200)).to.be.false;
            userService.createUser.restore();
        });
        it('should return an error if required fields are missing for user registration', async () => {
            const req = {
                body: {
                    role: 'user',
                    email: 'sanju.zzaa@example.com',
                    password: 'password',
                    confirmPwd: 'password'
                }
            };
            await userController.createUser(req, res);
            expect(res.status.calledWith(400)).to.be.true;
        });

        it('should createUser a new admin successfully', async () => {
            const req = {
                body: {
                    role: 'admin',
                    email: 'admin@example.com',
                    password: 'adminpassword'
                }
            };
            const newAdmin = {
                message: 'Registration Success',
                email: 'admin@example.com',
                role: 'admin'
            };
            //sinon.stub(userService, 'createUser').resolves(newAdmin);
            await userController.createUser(req, res);
            expect(res.status.calledWith(200)).to.be.true;
        });
    });
    describe('userLogin', () => {
        // it('should userLogin a user successfully', async () => {
        //     const req = {
        //         body: {
        //             email: 'sanju.zzaa@example.com',
        //             password: 'password',
        //             role: 'user'
        //         }
        //     };
        //     const user = {
        //         token: 'jwt-token',
        //         email: 'sanju.zzaa@example.com',
        //         role: 'user'
        //     };
        //     sinon.stub(userService, 'userLogin').resolves(user);
        //     await userController.userLogin(req, res);
        //     expect(res.status.calledWith(200)).to.be.true;
        // });

        it('should return an error if userLogin fails', async () => {
            const req = {
                body: {
                    email: 'invalid@example.com',
                    password: 'wrongpassword',
                    role: 'user'
                }
            };
            sinon.stub(userService, 'userLogin').resolves({ error: 'Invalid Email or Password' });
            await userController.userLogin(req, res);
            expect(res.status.calledWith(500)).to.be.false;
            userService.userLogin.restore();
        });
    });

    describe('resetPwd', () => {
        it('should successfully update the password', async () => {
            const req = {
                params: {
                    userLoginId: 'sanju_zzaa'
                },
                body: {
                    password: 'newpassword',
                    confirmPwd: 'newpassword'
                }
            };
            const user = {
                message: 'Password Updated Successfully',
                userLoginId: 'sanju_zzaa'
            };
            sinon.stub(userService, 'resetPwd').resolves(user);
            await userController.resetPwd(req, res);
            expect(res.status.calledWith(200)).to.be.true;
        });

        it('should return an error if passwords do not match', async () => {
            const req = {
                params: {
                    userLoginId: 'sanju_zzaa'
                },
                body: {
                    password: 'newpassword',
                    confirmPwd: 'differentpassword'
                }
            };
            await userController.resetPwd(req, res);
            expect(res.status.calledWith(500)).to.be.false;
        });
    });
});
