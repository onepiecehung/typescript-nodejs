import chai, { assert, expect } from "chai";
import ChaiHttp from "chai-http";
import { describe } from "mocha";

import { SERVER } from "../../config/service.config";

const port: Number | any = SERVER.PORT;

const server: any =
    `${SERVER.URL_API_HOST}:${Math.abs(port)}/rest/v1` ||
    `localhost:8018/rest/v1`;

chai.use(ChaiHttp);

const CHAI = chai.request(server).keepOpen();

describe("User", function () {
    // ? ms
    this.slow(0.2 * 1000); // ! 300ms, setup

    before(() => {
        // runs once before the first test in this block
    });

    after(() => {
        // runs once after the last test in this block
    });

    beforeEach(() => {
        // runs before each test in this block
    });

    afterEach(() => {
        // runs after each test in this block
    });

    // test cases
    it("TESTING", (done) => {
        CHAI.get("/").end((error: any, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });
});
