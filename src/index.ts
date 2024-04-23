import { app } from "./app";
import sequelize from "./infraestructure/database";

const PORT = 3000;

const main = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log("Server on port: ", PORT);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

void main();
