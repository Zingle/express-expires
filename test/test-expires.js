const expect = require("expect.js");
const sinon = require("sinon");
const expires = require("../expires");

describe("express-expires()", () => {
    var middleware;

    beforeEach(() => {
        middleware = expires(5000);
    });

    it("should return middleware function", () => {
        expect(middleware).to.be.a("function");
        expect(middleware.length).to.be(3);
    });

    it("should send 400 on missing expiry", done => {
        const req = {get: () => {}};
        const res = {status(status) {
            expect(status).to.be(400);
            return {send: () => done()};
        }};

        middleware(req, res, () => {});
    });

    it("should send 400 on large expiry", done => {
        const req = {get: () => new Date(Date.now() + 10000).toUTCString()};
        const res = {status(status) {
            expect(status).to.be(400);
            return {send: () => done()};
        }};

        middleware(req, res, () => {});
    });

    it("should call next after verifying expiry", done => {
        const req = {get: () => new Date(Date.now() + 1000).toUTCString()};
        const res = {};
        middleware(req, res, done);
    });
});
