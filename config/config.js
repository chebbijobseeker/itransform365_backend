require("dotenv").config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER || "default",
    password: process.env.POSTGRES_PASSWORD || "JiU75jzkDneS",
    database: process.env.POSTGRES_DATABASE || "verceldb",
    host:
      process.env.POSTGRES_HOST ||
      "ep-polished-mud-a4hztz44-pooler.us-east-1.aws.neon.tech",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: process.env.POSTGRES_USER || "default",
    password: process.env.POSTGRES_PASSWORD || "JiU75jzkDneS",
    database: process.env.POSTGRES_DATABASE || "verceldb",
    host:
      process.env.POSTGRES_HOST ||
      "ep-polished-mud-a4hztz44-pooler.us-east-1.aws.neon.tech",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: process.env.POSTGRES_USER || "default",
    password: process.env.POSTGRES_PASSWORD || "JiU75jzkDneS",
    database: process.env.POSTGRES_DATABASE || "verceldb",
    host:
      process.env.POSTGRES_HOST ||
      "ep-polished-mud-a4hztz44-pooler.us-east-1.aws.neon.tech",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
