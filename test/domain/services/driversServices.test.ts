import request from "supertest";
import { app } from "../../../src/app";

describe("Pruebas en el método GET", () => {
  test("Debe retornar un status 200", async () => {
    const res = await request(app)
      .get("/drivers")
      .expect("Content-Type", /json/);
    expect(res.status).toEqual(200);
  });
});
