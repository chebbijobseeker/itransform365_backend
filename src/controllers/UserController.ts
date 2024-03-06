import { FastifyRequest, FastifyReply } from "fastify";
import { compare, hash } from "bcrypt";
import { UserModel } from "../models/User";
import { User } from "../interfaces/UserInteface";
import jwt from "jsonwebtoken";

// Function to generate JWT token
const generateToken = (payload: any, expiresIn: string): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn });
};

//Function to verify JWT token
// const verifyToken = (token: string): any => {
//   try {
//     return jwt.verify(token, process.env.JWT_SECRET as string);
//   } catch (err) {
//     return null; // Token verification failed
//   }
// };

const refreshToken = (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { refreshToken } = req.body as { refreshToken: string };
    // Decode the refresh token to get any necessary data
    const decodedRefreshToken = jwt.decode(refreshToken) as {
      [key: string]: any;
    };

    // Assuming tokenResponse contains the required data
    reply.status(200).send({});

    return reply.code(200).send({
      message: "success",
      accessToken: generateToken({ userId: decodedRefreshToken.userId }, "15m"),
      accessTokenExpiry: Date.now() + 15 * 60 * 1000, // 15 minutes from now
      refreshToken: generateRefreshToken(),
    });
  } catch (error) {
    console.error({ error });
    return reply.code(500).send({ message: "Internal Server Error" });
  }
};

// Function to generate refresh token
const generateRefreshToken = (): string => {
  return jwt.sign({}, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "7d",
  });
};

// Register user route
async function registerUser(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, password, confirmPassword, fullName, phoneNumber } =
      req.body as User;

    // Validate email, password, and other required fields
    if (!email || !password || !confirmPassword || !fullName || !phoneNumber) {
      return reply.code(400).send({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return reply.code(400).send({ message: "Passwords do not match" });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create user with phone number
    await UserModel.create({
      email,
      password: hashedPassword,
      fullName,
      phoneNumber,
    });

    // Generate JWT access token
    const accessToken = generateToken({ email }, "15min");

    // Generate refresh token
    const refreshToken = generateRefreshToken();

    return reply
      .code(200)
      .send({ message: "success", accessToken, refreshToken });
  } catch (error) {
    console.error({ error });
    return reply.code(500).send({ message: "Internal Server Error" });
  }
}

// Login user route
async function loginUser(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, password } = req.body as { email: string; password: string };

    // Validate email and password
    if (!email || !password) {
      return reply
        .code(400)
        .send({ message: "Email and password are required" });
    }
    //
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

    // User authenticated successfully, generate JWT access token
    const accessToken = generateToken({ email }, "15min");

    // Generate refresh token
    const refreshToken = generateRefreshToken();

    // Return tokens and user data
    return reply
      .code(200)
      .send({ message: "Login successful", accessToken, refreshToken, user });
  } catch (error) {
    console.error({ error });
    return reply.code(500).send({ message: "Internal Server Error" });
  }
}

export { registerUser, loginUser, refreshToken };
