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

describe("Pruebas en el endpoint /drivers - PUT", () => {
  test("Debe retornar un status 200 y success en true.", async () => {
    const newDriver = await api.post("/drivers").send(driver_niko);
    const driver = await api.get("/drivers/" + newDriver.body.id);

    expect(driver.body.name).toEqual("Niko");

    const res = await api
      .put("/drivers/" + driver.body.id)
      .send({ name: "Juan" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBeTruthy();
  });

  test("El nombre de un chofer es actualizado.", async () => {
    const newDriver = await api.post("/drivers").send(driver_niko);
    const driver = await api.get("/drivers/" + newDriver.body.id);

    expect(driver.body.name).toEqual("Niko");

    await api.put("/drivers/" + driver.body.id).send({ name: "Juan" });

    const driver_updated = await api.get("/drivers/" + driver.body.id);
    expect(driver_updated.body.name).toEqual("Juan");
  });
});

afterAll(async () => {
  await resetDB();
});
