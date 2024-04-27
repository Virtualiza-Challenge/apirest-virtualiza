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
  test("Al actualizar debe retornar success true.", async () => {
    const driver = await api.post("/drivers").send(driver_available);
    const vehicle = await api.post("/vehicles").send(vehicle_available);
    const newTrip = {
      date: "2024-04-19",
      hour: "18",
      minutes: "49",
      kms: 3000,
      driver_id: driver.body.result.id,
      vehicle_id: vehicle.body.result.id,
    };
    const trip_created = await api.post("/trips").send(newTrip);

    const trip_found = await api.get(`/trips/${trip_created.body.result.id}`);

    const res = await api
      .put(`/trips/${trip_found.body.result.id}`)
      .send({ hour: "15" });

    expect(res.body.result.success).toBeTruthy();
  });

  test("Se actualiza la hora de un viaje.", async () => {
    const driver = await api.post("/drivers").send(driver_available);
    const vehicle = await api.post("/vehicles").send(vehicle_available);
    const newTrip = {
      date: "2024-04-19",
      hour: "18",
      minutes: "49",
      kms: 3000,
      driver_id: driver.body.result.id,
      vehicle_id: vehicle.body.result.id,
    };
    const res = await api.post("/trips").send(newTrip);

    const trip_found = await api.get(`/trips/${res.body.result.id}`);

    expect(trip_found.body.result.hour).toEqual(18);

    await api.put(`/trips/${trip_found.body.result.id}`).send({ hour: "15" });

    const trip = await api.get(`/trips/${res.body.result.id}`);

    expect(trip.body.result.hour).toEqual(15);
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
