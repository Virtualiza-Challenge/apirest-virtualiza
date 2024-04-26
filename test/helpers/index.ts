import { Driver, Trip, Vehicle } from "../../src/domain/models";

export const resetDB = async () => {
  try {
    await Trip.destroy({
      where: {},
    });
    await Driver.destroy({
      where: {},
    });
    await Vehicle.destroy({
      where: {},
    });

    // console.log("Se eliminaron todos los registros de la tabla Vehicle.");
  } catch (err) {
    console.error("Error al eliminar registros:", err);
  }
};
