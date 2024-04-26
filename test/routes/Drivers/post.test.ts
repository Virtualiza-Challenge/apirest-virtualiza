import { resetDB } from "../../helpers";
import { api } from "../../setup";

beforeAll(async () => {
  await resetDB();
});

describe("Pruebas en el endpoint drivers - POST", () => {
  test("Debe retornar un status 200", async () => {
    const res = await api.post("/drivers").send({
      name: "Niko",
      surname: "Brain",
      dni: "34422345",
      license_type: "Professional",
      emision_date: "2022-06-06",
    });
    console.log(res.body);

    expect(res.status).toBe(200);
  });
});

afterAll(async () => {
  await resetDB();
});
