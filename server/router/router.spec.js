'use strict';

const router = require('./router.js');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('Router module tests', () => {
    it('should return a router', (done) => {
        router.should.exist;
        done();
    });
});
