const app = require("../app")
const request = require("supertest")

describe("POST /companies", () => {

    describe("given a name and a logoUrl", () => {

        // test("should save the name and logoUrl to the database", async () => {
        //     const response = await request(app).post("/companies").send({
        //         name: "Hill & Szrok",
        //         logoUrl: "https://fakelogo.url/logo.png"
        //     })
        //     const check = await request(app).get(`/companies/${response.body.id}`)
        //     expect(check.body).toBeDefined()
        // })
        
        // should respond with a json object containing the company id
        test("should respond with a 201 status code", async () => {
            const response = await request(app).post("/companies").send({
                name: "Hill & Szrok",
                logoUrl: "https://fakelogo.url/logo.png"
            })
            expect(response.statusCode).toBe(201)
        })

        test("should specify json in the content type header", async () => {
            const response = await request(app).post("/companies").send({
                name: "Hill & Szrok",
                logoUrl: "https://fakelogo.url/logo.png"
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })

        test("response has an id", async () => {
            const response = await request(app).post("/companies").send({
                name: "Hill & Szrok",
                logoUrl: "https://fakelogo.url/logo.png"
            })
            expect(response.body.id).toBeDefined()
        })


    })

    describe("when the name or logoUrl is missing", () => {
        test("should respond with a 400 status code", async () => {
            const bodyData = [
                {name: "Hill & Szrok"},
                {logoUrl: "https://fakelogo.com/logo.png"},
                {}
            ]

            for (const body of bodyData) {
                const response = await request(app).post("/companies").send(body)
                expect(response.statusCode).toBe(400)
            }
        })
    })

})
