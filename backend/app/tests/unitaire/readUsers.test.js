const app = require("../../app");
const readUsers = require("../../services/bdd/readUsers");

describe("readUsers function", () => {
    let server;

    beforeAll(async () => {
        server = app.listen(3001);
    })

    afterAll(() => {
        server.close();
    });

    it("should return an array of users", () => {
        const users = readUsers();

        expect(Array.isArray(users)).toBe(true);

        users.forEach(user => {
            expect(user).toHaveProperty("username");
            expect(user).toHaveProperty("role");
        });
    });

    it("should contain at least one user with expected properties", () => {
        const users = readUsers();
        
        expect(users.length).toBeGreaterThan(0);

        const user = users[0];
        expect(user).toHaveProperty("username");
        expect(user).toHaveProperty("password");
        expect(user).toHaveProperty("role");
    });
});
