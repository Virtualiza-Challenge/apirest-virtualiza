import { Sequelize } from "sequelize";
import { Environment } from "../../config";

let sequelize: Sequelize | null = null;

export function getDatabaseInstance(): Sequelize {
  if (!sequelize) {
    sequelize = new Sequelize(
      Environment.DB_NAME,
      Environment.DB_USER_ROOT,
      Environment.DB_PASSWORD,
      {
        logging: false,
        host: Environment.DB_HOST,
        dialect:
          "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
      }
    );
  }

  if (!!sequelize) {
    (async () => {
      try {
        await sequelize.sync();
      } catch (error) {
        console.error("Unable to connect to the database:", error);
      }
    })();
  }
  return sequelize;
}
