import Fastify from "fastify";

import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import Register from "./controllers/UserController";

import dotenv from "dotenv";
dotenv.config();

const fastify = Fastify({
  logger: true,
}).withTypeProvider<JsonSchemaToTsProvider>();

fastify.post("/register", Register);

const port = 5000;

fastify.listen({ port }, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("SERVER  IS RUNNING ON PORT", port);
});
