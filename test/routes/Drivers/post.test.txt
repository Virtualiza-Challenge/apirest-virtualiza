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

describe("Pruebas en el endpoint /drivers - POST", () => {
  test("Debe retornar un status 201 y el ID.", async () => {
    const res = await api.post("/drivers").send(driver_niko);

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });
});

afterAll(async () => {
  await resetDB();
});
