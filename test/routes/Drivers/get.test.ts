import { api } from "../../setup";

describe("Pruebas en el endpoint /drivers - GET", () => {
  test("Debe retornar un status 200", async () => {
    const res = await api
      .get("/drivers")
      .expect("Content-Type", /application\/json/);
    expect(res.status).toEqual(200);
  });

  test(`Estructura de respuesta { count: number; result: any; error: boolean; message: any}`, async () => {
    const res = await api.get("/drivers");

    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.count).toBeDefined();
    expect(res.body.result).toBeDefined();
    expect(res.body.error).toBeFalsy();
    expect(res.body.message).toBeFalsy();
  });

  test("Retorna los choferes y cantidad existente.", async () => {
    const res = await api.get("/drivers");

    expect(res.body.count).toEqual(expect.any(Number));
    expect(res.body.result).toEqual(expect.any(Array));
  });

  test("Debe devolver 'false' si no encuentra el chofer por ID.", async () => {
    const res = await api.get("/drivers/999999");

    expect(res.body.result).toBeFalsy();
  });
});
