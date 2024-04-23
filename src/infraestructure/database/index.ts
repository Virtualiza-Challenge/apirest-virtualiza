import { getDatabaseInstance } from "../adapters/database.adapter";

// Obtener la instancia de Sequelize
const sequelize = getDatabaseInstance();

// Exportar la instancia de Sequelize
export default sequelize;
