import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import {MongoClient} from "mongodb";
import {exit} from "process";
import {loginPath} from "../server.js";
import {usersPath} from "../server.js";
import {logoutPath} from "../server.js";

const app = express();
let mongoClient;
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();
app.use(cookieParser("process.env.COOKIE_SECRET"));
app.use("/api/login",loginPath);
app.use("/api/user",usersPath);

beforeAll(async () => {
    mongoClient = new MongoClient(process.env.MONGO_DB_URL);
    await mongoClient.connect();
    const database = mongoClient.db("eksamen");
    await database.collection("users");
    //app.use("/api/movies", MoviesApi(database));
});
afterAll(() => {
    mongoClient.close();
});
describe("test user api", () => {
    it("fails to login with unknown user", async () => {
        await request(app)
            .post("/api/login/")
            .send({username: "hurr", password: "durr"})
            .expect(401);
    });
    it("Logs in with valid user", async () => {
        await request(app)
            .post("/api/login/")
            .send({username: "john doe", password: "123"})
            .expect(302);
    });
    it("Fetches all users", async () => {
        await request(app)
            .get("/api/user/")
            .send()
            .expect(200);
    });
    it("Adds a new user", async () => {
        await request(app)
            .post("/api/user/")
            .send({username:"Test",password:"test",department:"test",role:"test"})
            .expect(200);
    });
    it("Adds Updates added user", async () => {
        await request(app)
            .put("/api/user/")
            .send({username:"Test",password:"different password",department:"test",role:"test"})
            .expect(302);
    });
    it("Deletes user", async () => {
        await request(app)
            .delete("/api/user/")
            .send({username:"Test"})
            .expect(200);
    });
//    const {username,password,department,role}=req.body;
    /**it("lists saved movies", async () => {
        const username="name";
        const password="password";
        const department="department";
        const role = "role";
        await request(app)
            .post("/api/user")
            .send({ username, password,department, role })
            .expect(200);

        const listResponse = await request(app).get("/api/user").expect(404);
        //expect(listResponse.body.map(({ title }) => title)).toContain(title);
     *  it("filters movies by country", async () => {
     *         const title = "Norwegian movie as of " + new Date();
     *         await request(app)
     *             .post("/api/movies")
     *             .send({ title, year: 2022, country: "Norway" })
     *             .expect(200);
     *
     *         expect(
     *             (await request(app).get("/api/movies?country=Norway")).body.map(
     *                 ({ title }) => title
     *             )
     *         ).toContain(title);
     *         expect(
     *             (await request(app).get("/api/movies?country=USA")).body.map(
     *                 ({ title }) => title
     *             )
     *         ).not.toContain(title);
     *     });
     */
});
