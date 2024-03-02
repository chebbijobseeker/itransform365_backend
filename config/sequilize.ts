import { Sequelize } from "sequelize";

// Sequelize configuration
const sequelize = new Sequelize(
  "postgres://default:n2d6liKjMeTv@ep-fragrant-dawn-a4zcfi8b-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",

  {
    dialect: "postgres",
    host: "localhost",
  }
);

export { sequelize };
