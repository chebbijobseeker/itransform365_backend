import { FastifyRequest, FastifyReply } from "fastify";
import { hash } from "bcrypt";
import { UserModel } from "../models/User"; // Import the User model from your models file
import { User } from "../interfaces/UserInteface";

async function Register(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, password, confirmPassword, fullName } = req.body as User;

    // Validate email and password
    if (!email || !password || !confirmPassword || !fullName) {
      return reply.code(400).send({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return reply.code(400).send({ message: "Passwords do not match" });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create user
    await UserModel.create({ email, password: hashedPassword, fullName });

    return reply.code(200).send({ message: "success" });
  } catch (error) {
    console.error({ error });
    return reply.code(500).send({ message: "Internal Server Error" });
  }
}

export default Register;
