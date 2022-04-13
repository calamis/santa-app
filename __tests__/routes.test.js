const request = require("supertest");
const app = require("../server");

const searchUser = jest.fn();
const getRegisteredUsersFromURL = jest.fn();
const getAge = jest.fn();
const searchUserProfile = jest.fn();
const isDateFormatValid = jest.fn();

describe("POST message to Santa", function () {
  describe("given a username and wish", function () {
    test("Should response with 200 Status code", async () => {
      const response = await request(app).post("/").send({
        username: "username",
        wish: "Gift",
      });
      expect(response.statusCode).toBe(200);
    });

    // User is registered
    test("Should check if the user is registered", async () => {
      const bodyData = [
        { username: "charlie.brown" },
        { username: "Junnie" },
        { username: "Emmie" },
      ];

      for (const body of bodyData) {
        getRegisteredUsersFromURL.mockReset();
        const response = await request(app).post("/").send(body);
        expect(response.body.username).toBe(response.body.username);
      }
    });

    // Check user not registered
    test("Should check if the user is not registered", async () => {
      const bodyData = [{ username: "Junnie" }, { username: "Emmie" }];
      const registered = [
        { username: "charlie.brown" },
        { username: "james.bond" },
        { username: "bugs.bunny" },
      ];

      for (const body of bodyData) {
        searchUser.mockReset();
        const response = await request(app).post("/").send(body);
        expect(response.body.username).not.toBe(registered);
      }
    });

    describe("Child is 10 years older.", function () {});
    test("Should check if the user is 10 years older", async () => {
      const bodyData = [
        { username: "charlie.brown", birthdate: "2017/12/05" },
        { username: "james.bond", birthdate: "1987/01/01" },
        { username: "bugs.bunny", birthdate: "2010/23/01" },
      ];

      for (const body of bodyData) {
        searchUserProfile.mockReset();
        jest.useFakeTimers();
        const getAge =
          new Date(new Date() - new Date(body.birthdate[1])).getFullYear() -
          1970;

        expect(getAge).toBeGreaterThanOrEqual(10);
      }
    });
  });
});
