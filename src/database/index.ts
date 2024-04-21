import { Sequelize } from 'sequelize'

// Option 3: Passing parameters separately (other dialects)
export const sequelize = new Sequelize(
  'virtualizadb',
  'root',
  'myrootpassword',
  {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  }
)
