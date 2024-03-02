import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Sequelize configuration
const sequelize = new Sequelize(
  process.env.POSTGRES_URL as string,

  {
    dialect: "postgres",
    host: "localhost",
  }
);

export { sequelize };
