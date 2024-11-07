const app = require("../../app");
const request = require("supertest");

describe('Users API', () => {
    let token;
    let server;

    beforeAll(async () => {
        server = app.listen(3001);

        const res = await request(app)
            .post('/login')
            .send({
                username: "admin",
                password: "password"
            })
        
        expect(res.status).toBe(200);
        token = res.body.token;
        expect(token).toBeDefined();
    })

    afterAll(() => {
        server.close();
    });

    describe('update role user', () => {
        it('When admin update roles user, then the user should be modified successfully', async () => {
            expect(token).toBeDefined();

            const editingUser = { id: 1, roles: ["ROLE_USER"] };

            const res = await request(app)
                .put(`/users/${editingUser.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ roles: editingUser.roles })

            expect(res.status).toBe(200);
        })
    })
})