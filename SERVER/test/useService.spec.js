const sinon = require('sinon');
const { expect } = require('chai');
const userService = require('../src/service/user.services');
const userDao = require('../src/dao/user.dao');

describe('User Service', () => {
    describe('createUser', () => {
        it('should createUser a new user successfully', async () => {
            const data = {
                email: 'sanju.zzaa@example.com',
                password: 'password',
                firstName: 'sanju',
                lastName: 'zzaa',
                userLoginId: 'sanju_zzaa',
                contactNum: '1234567890'
            };
            const newUser = {
                message: 'User createUsered successfully',data
            };
            sinon.stub(userDao, 'createUser').resolves(newUser);
            const result = await userService.createUser(data);
            expect(result).to.deep.equal(newUser);
            expect(userDao.createUser.calledOnceWith(data)).to.be.true;
            userDao.createUser.restore();
        });
    });

    describe('userLogin', () => {
        it('should log in a user successfully', async () => {
            const email = 'sanju.zzaa@example.com';
            const password = 'password';
            const role = 'user';

            const user = {
                token: 'jwt-token',
                email: 'sanju.zzaa@example.com',
                role: 'user'
            };

            sinon.stub(userDao, 'loginUser').resolves(user);
            const result = await userService.userLogin(email, password, role);
            expect(result).to.deep.equal(user);
            expect(userDao.loginUser.calledOnceWith(email, password, role)).to.be.true;
            userDao.loginUser.restore();
        });
    });

    describe('resetPwd', () => {
        it('should successfully update the password', async () => {
            const userLoginId = 'sanju_zzaa';
            const password = 'newpassword';
            const confirmPwd = 'newpassword';

            const updatedUser = {
                message: 'Password updated successfully',
                userLoginId: 'sanju_zzaa'
            };
            sinon.stub(userDao, 'resetPwd').resolves(updatedUser);
            const result = await userService.resetPwd(userLoginId, password, confirmPwd);
            expect(result).to.deep.equal(updatedUser);
            expect(userDao.resetPwd.calledOnceWith(userLoginId, password, confirmPwd)).to.be.true;
            userDao.resetPwd.restore();
        });

        it('should return an error if passwords do not match', async () => {
            const userLoginId = 'sanju_zzaa';
            const password = 'newpassword';
            const confirmPwd = 'differentpassword';
            sinon.stub(userDao, 'resetPwd').rejects(new Error('Passwords do not match'));
            try {
                await userService.resetPwd(userLoginId, password, confirmPwd);
            } catch (error) {
                expect(error.message).to.equal('Passwords do not match');
            }
            expect(userDao.resetPwd.calledOnceWith(userLoginId, password, confirmPwd)).to.be.true;

            userDao.resetPwd.restore();
        });
    });
});
