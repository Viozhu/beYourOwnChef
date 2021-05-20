/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");
const { v4: uuidv4 } = require("uuid");
const agent = session(app);
const id = uuidv4();
const recipe = {
  id,
  title: "Milanea a la napolitana",
  summary: "Es una mila re copada",
  spoonacularScore: 12,
};

describe("Recipe routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Recipe.sync({ force: true }).then(() => Recipe.create(recipe))
  );
  it("Should get 200", () => agent.get("/recipes/*").expect(200));
});

describe("GET /recipe", () => {
  it("Should get 200", () => agent.get("/recipe").expect(200));

  it("The Recipe DataBase must be a Array", () =>
    agent.get("/recipe").then((res) => {
      expect(res.body).to.be.an("array");
    }));
  it("The recipe must have 'Title' property", () =>
    agent.get("/recipe").then((res) => {
      expect(res.body[0]).to.have.property("title");
    }));
  it("The recipe must have 'Summary' property", () =>
    agent.get("/recipe").then((res) => {
      expect(res.body[0]).to.have.property("summary");
    }));
  it("The Score must be a number", () =>
    agent.get("/recipe").then((res) => {
      expect(res.body[0].spoonacularScore).to.be.a("number");
    }));
});
describe("POST /recipe", () => {
  it("Should get 200", function (done) {
    this.timeout(500);
    agent.post("/recipe").expect(200);
    setTimeout(done, 300);
  });

  it("Must be a Object", function (done) {
    this.timeout(500);
    agent
      .post("/recipe")
      .send(recipe)
      .then((res) => {
        expect(res.body.result).to.be.an("object");
      });
    setTimeout(done, 300);
  });
});
