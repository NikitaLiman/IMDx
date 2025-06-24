"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "../../../prisma/prisma-client";
import { hashSync } from "bcrypt";

export const CreateUser = async (body: Prisma.userCreateInput) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });
    if (!user) console.log("User not found");

    const newUser = await prisma.user.create({
      data: {
        fullname: body.fullname,
        password: hashSync(body.password ?? "", 10),
        email: body.email,
      },
    });
    return newUser;
  } catch (error) {
    console.log(error);
  }
};
