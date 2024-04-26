import {
  driver_available,
  trip_available,
  vehicle_available,
} from "../../constants";
import { resetDB } from "../../helpers";
import { api } from "../../setup";

beforeAll(async () => {
  await resetDB();
});

describe("Pruebas en el endpoint /trips - POST", () => {
  test("Debe retornar un status 201 y el ID.", async () => {
    const driver = await api.post("/drivers").send(driver_available);
    const vehicle = await api.post("/vehicles").send(vehicle_available);

    const newTrip = {
      ...trip_available,
      driver_id: driver.body.result.id,
      vehicle_id: vehicle.body.result.id,
    };
    const res = await api.post("/trips").send(newTrip);

    expect(res.status).toBe(201);
    expect(res.body.result.id).toBeDefined();
  });

  test("Si no cumple con el esquema de validación recibe status 400 y un mensaje de error.", async () => {
    const res = await api.post("/trips").send(trip_available);

    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
  });
});

afterAll(async () => {
  await resetDB();
});
