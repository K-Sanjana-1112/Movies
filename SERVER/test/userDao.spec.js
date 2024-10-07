const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const UserModel = require('../src/Model/userModel');
const Admin = require('../src/Model/adminModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userdao = require('../src/dao/user.dao');

describe('User DAO', function () {
    beforeEach(function () {
        sinon.restore();
    });
    describe('createUser', function () {
        it('should createUser a user successfully', async function () {
            const userData = { firstName: 'sanju', lastName: 'aabb', email: 'sanju@example.com', password: 'password', confirmPwd: 'password', role: 'user' };
            sinon.stub(bcryptjs, 'hash').resolves('hashedPassword');
            sinon.stub(UserModel, 'create').resolves(userData);
            const result = await userdao.createUser(userData);
            expect(result.message).to.equal('User Created Successfully');
        });
        it('should return password mismatch error', async function () {
            const userData = { password: 'password', confirmPwd: 'differentPassword' };
            const result = await userdao.createUser(userData);
            expect(result.message).to.equal('Passwords do not match');
        });
    });

    describe('loginUser', function () {
        it('should return token and user on successful login', async function () {
            const userData = { email: 'sanju@example.com', password: 'password', role: 'user' };
            const userFromDb = { email: 'sanju@example.com', password: 'hashedPassword', role: 'user' };
            sinon.stub(UserModel, 'findOne').resolves(userFromDb);
            sinon.stub(bcryptjs, 'compare').resolves(true);
            sinon.stub(jwt, 'sign').returns('signedToken');
            const result = await userdao.loginUser('sanju@example.com', 'password', 'user');
        });

        it('should return invalid email or password error', async function () {
            sinon.stub(UserModel, 'findOne').resolves(null);
            const result = await userdao.loginUser('invalid@example.com', 'password', 'user');
            expect(result.message).to.equal('Invalid Email or Password');
        });
    });

    describe('resetPwd', function () {
        it('should update the password successfully', async function () {
            const user = { loginId: 'sanju123', password: 'password', confirmPwd: 'password' };
            const updatedUser = { loginId: 'sanju123', password: 'hashedPassword' };
            sinon.stub(bcryptjs, 'hash').resolves('hashedPassword');
            sinon.stub(UserModel, 'findOneAndUpdate').resolves(updatedUser);
            const result = await userdao.resetPwd('sanju123', 'password', 'password');
            expect(result.message).to.equal('Password Updated Successfully');
        });

        it('should return password mismatch error', async function () {
            const result = await userdao.resetPwd('sanju123', 'password', 'differentPassword');
            expect(result.message).to.equal('Passwords do not match');
        });
    });
});
