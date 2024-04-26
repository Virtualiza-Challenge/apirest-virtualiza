import { resetDB } from "../../helpers";
import { api } from "../../setup";

beforeAll(async () => {
  await resetDB();
});

const driver_niko = {
  name: "Niko",
  surname: "Brain",
  dni: "34422345",
  license_type: "Professional",
  emision_date: "2022-06-06",
};

describe("Pruebas en el endpoint /drivers - DELETE", () => {
  test("Debe retornar un status 200 y success en true.", async () => {
    const newDriver = await api.post("/drivers").send(driver_niko);

    const driver = await api.get("/drivers/" + newDriver.body.id);

    const res = await api.delete("/drivers/" + driver.body.id);

    expect(res.status).toBe(200);
    expect(res.body.success).toBeTruthy();
  });

  test("Este endponit anula el chofer poniendo su propiedad isActive en false.", async () => {
    const newDriver = await api.post("/drivers").send(driver_niko);

    const driver = await api.get("/drivers/" + newDriver.body.id);

    expect(driver.body.isActive).toBeTruthy();

    const driverUpdated = await api.delete("/drivers/" + driver.body.id);

    expect(driverUpdated.body.isActive).toBeFalsy();
  });
});

afterAll(async () => {
  await resetDB();
});
