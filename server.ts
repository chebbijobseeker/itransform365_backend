import Fastify from "fastify";

import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { registerUser, loginUser } from "./controllers/UserController";
import cors from "@fastify/cors";

const fastify = Fastify({
  logger: true,
}).withTypeProvider<JsonSchemaToTsProvider>();

fastify.register(cors, {
  origin: "*",
  credentials: true,
});
// Register the fastify-cors plugin

fastify.post("/register", registerUser);
fastify.post("/login", loginUser);

const port = 5000;

fastify.listen({ port }, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("SERVER  IS RUNNING ON PORT", port);
});
