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

describe("Pruebas en el endpoint /trips - DELETE", () => {
  test("Debe retornar un status 200 y success en true.", async () => {
    const driver = await api.post("/drivers").send(driver_available);
    const vehicle = await api.post("/vehicles").send(vehicle_available);
    const newTrip = {
      ...trip_available,
      driver_id: driver.body.result.id,
      vehicle_id: vehicle.body.result.id,
    };
    const trip = await api.post("/trips").send(newTrip);

    const res = await api.delete("/trips/" + trip.body.result.id);

    expect(res.status).toBe(200);
    expect(res.body.result.success).toBeTruthy();
  });

  test("Anula el viaje poniendo su propiedad isCanceled en true.", async () => {
    const driver = await api.post("/drivers").send(driver_available);
    const vehicle = await api.post("/vehicles").send(vehicle_available);
    const newTrip = {
      ...trip_available,
      driver_id: driver.body.result.id,
      vehicle_id: vehicle.body.result.id,
    };
    const trip = await api.post("/trips").send(newTrip);

    expect(trip.body.result.isCanceled).toBeFalsy();

    await api.delete("/trips/" + trip.body.result.id);

    const tripCanceled = await api.delete("/trips/" + trip.body.result.id);

    expect(tripCanceled.body.result.isCanceled).toBeFalsy();
  });
});

afterAll(async () => {
  await resetDB();
});
