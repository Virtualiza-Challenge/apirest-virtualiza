import { app } from "./app";
import { sequelize } from "./database";

// import "./models/Driver";
// import "./models/Vehicle";
// import "./models/Trip";

const PORT = 3000;

const main = async () => {
  try {
    await sequelize.sync();
    // console.log("Connection has been established successfully.");
    app.listen(PORT, () => {
      console.log("Server on port: ", PORT);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

void main();
