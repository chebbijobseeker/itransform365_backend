import { FastifyRequest, FastifyReply } from "fastify";
import { compare, hash } from "bcrypt";
import { UserModel } from "../models/User"; // Import the User model from your models file
import { User } from "../interfaces/UserInteface";

async function registerUser(req: FastifyRequest, reply: FastifyReply) {
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

async function loginUser(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, password } = req.body as { email: string; password: string };

    // Validate email and password
    if (!email || !password) {
      return reply
        .code(400)
        .send({ message: "Email and password are required" });
    }

    // Check if the user exists
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return reply.code(404).send({ message: "User not found" });
    }

    // Verify password
    const passwordMatch = await compare(password, (user as any).password);
    if (!passwordMatch) {
      return reply.code(401).send({ message: "Incorrect password" });
    }

    // User authenticated successfully
    return reply.code(200).send({ message: "Login successful", user });
  } catch (error) {
    console.error({ error });
    return reply.code(500).send({ message: "Internal Server Error" });
  }
}

export { registerUser, loginUser };
