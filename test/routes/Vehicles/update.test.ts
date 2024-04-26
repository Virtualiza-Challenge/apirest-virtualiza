import { vehicle_available } from "../../constants";
import { resetDB } from "../../helpers";
import { api } from "../../setup";

beforeAll(async () => {
  await resetDB();
});

const new_plate = "HHH 900";

describe("Pruebas en el endpoint /vehicles - PUT", () => {
  test("Debe retornar un status 200 y success en true.", async () => {
    const newDriver = await api.post("/vehicles").send(vehicle_available);
    const driver = await api.get("/vehicles/" + newDriver.body.result.id);

    expect(driver.body.result.plate).toEqual("UQI 841");

    const res = await api
      .put("/vehicles/" + driver.body.result.id)
      .send({ plate: new_plate });

    expect(res.status).toBe(200);
    expect(res.body.result.success).toBeTruthy();
  });

  test("El nombre de un chofer es actualizado.", async () => {
    const newDriver = await api.post("/vehicles").send(vehicle_available);
    const driver = await api.get("/vehicles/" + newDriver.body.result.id);

    expect(driver.body.result.plate).toEqual("UQI 841");

    await api
      .put("/vehicles/" + driver.body.result.id)
      .send({ plate: new_plate });

    const driver_updated = await api.get("/vehicles/" + driver.body.result.id);
    expect(driver_updated.body.result.plate).toEqual(new_plate);
  });
});

afterAll(async () => {
  await resetDB();
});
