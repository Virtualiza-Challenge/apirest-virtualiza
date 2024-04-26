import { api } from "../../setup";

describe("Pruebas en el endpoint /drivers - GET", () => {
  test("Debe retornar un status 200", async () => {
    const res = await api
      .get("/drivers")
      .expect("Content-Type", /application\/json/);
    expect(res.status).toEqual(200);
  });

  test("Debe devolver la cantidad de choferes y el array de los mismos.", async () => {
    const res = await api.get("/drivers");

    expect(res.body).toBeDefined();
    expect(res.body.count).toEqual(expect.any(Number));
    expect(res.body.drivers).toEqual(expect.any(Array));
  });

  test("Debe devolver 'false' si no encuentra el chofer por ID.", async () => {
    const res = await api.get("/drivers/100");

    expect(res.body).toBeFalsy();
  });
});

// afterAll(async () => {
//   await closeConnectionDB();
// });
