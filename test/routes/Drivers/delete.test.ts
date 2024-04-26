import { driver_available } from "../../constants";
import { resetDB } from "../../helpers";
import { api } from "../../setup";

beforeAll(async () => {
  await resetDB();
});

describe("Pruebas en el endpoint /drivers - DELETE", () => {
  test("Debe retornar un status 200 y success en true.", async () => {
    const newDriver = await api.post("/drivers").send(driver_available);

    const driver = await api.get("/drivers/" + newDriver.body.result.id);

    const res = await api.delete("/drivers/" + driver.body.result.id);

    expect(res.status).toBe(200);
    expect(res.body.result.success).toBeTruthy();
  });

  test("Anula el chofer poniendo su propiedad isActive en false.", async () => {
    const newDriver = await api.post("/drivers").send(driver_available);

    const driver = await api.get("/drivers/" + newDriver.body.result.id);

    expect(driver.body.result.isActive).toBeTruthy();

    const driverUpdated = await api.delete("/drivers/" + driver.body.result.id);

    expect(driverUpdated.body.result.isActive).toBeFalsy();
  });
});

afterAll(async () => {
  await resetDB();
});
