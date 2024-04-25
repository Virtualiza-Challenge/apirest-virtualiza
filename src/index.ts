import { app } from "./app";
import { Environment } from "./config";

if (Environment.NODE_ENV !== "test") {
  app.listen(Environment.PORT, () => {
    console.log("Server on port: ", Environment.PORT);
  });
}
