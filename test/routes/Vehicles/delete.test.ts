import { vehicle_available } from "../../constants";
import { resetDB } from "../../helpers";
import { api } from "../../setup";

beforeAll(async () => {
  await resetDB();
});

describe("Pruebas en el endpoint /vehicles - DELETE", () => {
  test("Debe retornar un status 200 y success en true.", async () => {
    const newVehicle = await api.post("/vehicles").send(vehicle_available);

    const vehicle = await api.get("/vehicles/" + newVehicle.body.result.id);

    const res = await api.delete("/vehicles/" + vehicle.body.result.id);

    expect(res.status).toBe(200);
    expect(res.body.result.success).toBeTruthy();
  });

  test("Anula el chofer poniendo su propiedad isActive en false.", async () => {
    const newVehicle = await api.post("/vehicles").send(vehicle_available);

    const vehicle = await api.get("/vehicles/" + newVehicle.body.result.id);

    expect(vehicle.body.result.isActive).toBeTruthy();

    const vehicle_updated = await api.delete(
      "/vehicles/" + vehicle.body.result.id
    );

    expect(vehicle_updated.body.result.isActive).toBeFalsy();
  });
});

afterAll(async () => {
  await resetDB();
});
