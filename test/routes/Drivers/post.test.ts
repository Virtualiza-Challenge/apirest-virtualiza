import { driver_available } from "../../constants";
import { resetDB } from "../../helpers";
import { api } from "../../setup";

beforeAll(async () => {
  await resetDB();
});

describe("Pruebas en el endpoint /drivers - POST", () => {
  test("Debe retornar un status 201 y el ID.", async () => {
    const res = await api.post("/drivers").send(driver_available);

    expect(res.status).toBe(201);
    expect(res.body.result.id).toBeDefined();
  });

  test("Si no cumple con el esquema de validación recibe status 400 y un mensaje de error.", async () => {
    const { name, ...resProps } = driver_available;
    const res = await api.post("/drivers").send(resProps);

    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
  });
});

afterAll(async () => {
  await resetDB();
});
