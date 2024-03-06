import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const sequelize = new Sequelize(
  process.env.POSTGRES_URL as string,

  {
    dialect: "postgres",
  }
);

export { sequelize };
