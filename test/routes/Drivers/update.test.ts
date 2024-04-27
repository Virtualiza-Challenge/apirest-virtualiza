import { driver_available } from "../../constants";
import { resetDB } from "../../helpers";
import { api } from "../../setup";

beforeAll(async () => {
  await resetDB();
});

describe("Pruebas en el endpoint /drivers - PUT", () => {
  test("Debe retornar un status 200 y success en true.", async () => {
    const newDriver = await api.post("/drivers").send(driver_available);
    const driver = await api.get("/drivers/" + newDriver.body.result.id);

    expect(driver.body.result.name).toEqual("Niko");

    const res = await api
      .put("/drivers/" + driver.body.result.id)
      .send({ name: "Juan" });

    expect(res.status).toBe(200);
    expect(res.body.result.success).toBeTruthy();
  });

  test("El nombre de un chofer es actualizado.", async () => {
    const newDriver = await api.post("/drivers").send(driver_available);
    const driver = await api.get("/drivers/" + newDriver.body.result.id);

    expect(driver.body.result.name).toEqual("Niko");

    await api.put("/drivers/" + driver.body.result.id).send({ name: "Juan" });

    const driver_updated = await api.get("/drivers/" + driver.body.result.id);
    expect(driver_updated.body.result.name).toEqual("Juan");
  });
});

afterAll(async () => {
  await resetDB();
});
