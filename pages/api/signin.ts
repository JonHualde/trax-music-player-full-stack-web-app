import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          time: Date.now(),
        },
        "hello",
        { expiresIn: "72h" }
      );

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("TRAX_ACCESS_TOKEN", token, {
          httpOnly: true,
          maxAge: 72 * 60 * 60,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
      );

      res.json(user);
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(401);
    res.json({ error: "Email and/or password seem wrong" });
    return;
  }
};
