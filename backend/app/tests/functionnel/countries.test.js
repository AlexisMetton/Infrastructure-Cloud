const app = require("../../app");
const request = require("supertest");

describe('Countries API', () => {
    let token;
    let server;

    beforeAll(async () => {
        server = app.listen(3001);

        const res = await request(app)
            .post('/login')
            .send({
                username: "user2",
                password: "password"
            })
        
        expect(res.status).toBe(200);
        token = res.body.token;
        expect(token).toBeDefined();
    })

    afterAll(() => {
        server.close();
    });

    describe('update countries', () => {
        it('When asso update countries, then the country should be modified successfully', async () => {
            expect(token).toBeDefined();

            const resp = await request(app)
                .get("/countries")
                .set("Authorization", `Bearer ${token}`);

            expect(resp.status).toBe(200);
            const countries = resp.body;

            const editingCountry = { ...countries[0] };
            editingCountry.name.common = "South Georgia";

            const res = await request(app)
                .put(`/countries/${editingCountry.cca2}`)
                .set("Authorization", `Bearer ${token}`)
                .send(editingCountry);

            expect(res.status).toBe(200);

            const updatedResp = await request(app)
                .put(`/countries/${editingCountry.cca2}`)
                .set("Authorization", `Bearer ${token}`);

            expect(updatedResp.status).toBe(200);
        })
    })
})