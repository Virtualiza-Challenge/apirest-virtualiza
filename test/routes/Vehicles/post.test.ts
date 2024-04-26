import { vehicle_available, vehicle_unavailable } from "../../constants";
import { resetDB } from "../../helpers";
import { api } from "../../setup";

beforeAll(async () => {
  await resetDB();
});

describe("Pruebas en el endpoint /vehicles - POST", () => {
  test("Debe retornar un status 201 y el ID.", async () => {
    const res = await api.post("/vehicles").send(vehicle_available);

    expect(res.status).toBe(201);
    expect(res.body.result.id).toBeDefined();
  });

  test("Si no cumple con el esquema de validación recibe status 400 y un mensaje de error.", async () => {
    const { brand, ...resProps } = vehicle_available;
    const res = await api.post("/vehicles").send(resProps);

    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
  });

  test("Debe retornar success true.", async () => {
    const newVehicle = await api.post("/vehicles").send(vehicle_unavailable);
    const vehicle = await api.get("/vehicles/" + newVehicle.body.result.id);

    expect(vehicle.body.result.is_available).toBeFalsy();

    const res = await api.post(`/vehicles/${vehicle.body.result.id}/ready`);

    expect(res.body.result.success).toBeDefined();
  });

  test("Debe resetear el km de servicio de un vehiculo y establecerlo como disponible.", async () => {
    const newVehicle = await api.post("/vehicles").send(vehicle_unavailable);
    const vehicle = await api.get("/vehicles/" + newVehicle.body.result.id);

    expect(vehicle.body.result.kms).toBeGreaterThan(0);
    expect(vehicle.body.result.is_available).toBeFalsy();

    await api.post(`/vehicles/${vehicle.body.result.id}/ready`);

    const vehicle_updated = await api.get(
      "/vehicles/" + newVehicle.body.result.id
    );

    expect(vehicle_updated.body.result.kms).toEqual(0);
    expect(vehicle_updated.body.result.is_available).toBeTruthy();
  });
});

afterAll(async () => {
  await resetDB();
});
