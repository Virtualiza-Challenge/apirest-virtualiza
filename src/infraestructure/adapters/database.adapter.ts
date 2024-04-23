import { Sequelize } from "sequelize";

let sequelize: Sequelize | null = null;

export function getDatabaseInstance(): Sequelize {
  if (!sequelize) {
    sequelize = new Sequelize("virtualizadb", "root", "myrootpassword", {
      host: "localhost",
      dialect:
        "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
    });
  }
  return sequelize;
}