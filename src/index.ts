import Fastify from "fastify";
import dotenv from "dotenv";
dotenv.config();

import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import {
  registerUser,
  loginUser,
  refreshToken,
} from "./controllers/UserController";
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
fastify.post("/refreshToken", refreshToken);
fastify.get("/test", (req, reply) => {
  reply.status(200).send({ hello: "world" });
});

const port: number = parseInt(process.env.PORT || "5000", 10);

fastify.listen({ port }, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("SERVER  IS RUNNING ON PORT", port);
});
// test

export default fastify;
