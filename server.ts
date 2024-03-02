import Fastify from "fastify";

import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { registerUser, loginUser } from "./controllers/UserController";

const fastify = Fastify({
  logger: true,
}).withTypeProvider<JsonSchemaToTsProvider>();

fastify.post("/register", registerUser);
fastify.post("/login", loginUser);

const port = 5000;

fastify.listen({ port }, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("SERVER  IS RUNNING ON PORT", port);
});
