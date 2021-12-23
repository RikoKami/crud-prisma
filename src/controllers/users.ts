import { PrismaClient, User } from "@prisma/client";
import { Response } from "../utils";

const prisma = new PrismaClient();

export const allUsers = async (
  _: any,
  res: {
    json: ({}: Response<User[]>) => void;
  }
) => {
  const users = await prisma.user.findMany({
    include: {
      groups: true,
    },
  });
  res.json({
    success: true,
    payload: users,
    message: "Operation Successful",
  });
};

export const user = async (
  req: { params: { id: any } },
  res: {
    json: ({}: Response<User>) => void;
  }
) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      groups: true,
    },
  });

  if (!user) {
    return res.json({
      success: false,
      payload: null,
      message: "User not found",
    });
  }

  res.json({
    success: true,
    payload: user,
    message: "Operation Successful",
  });
};

export const createUser = async (
  req: { body: User },
  res: { json: ({}: Response<User>) => void }
) => {
  const userEmail = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
    select: {
      email: true,
    },
  });

  if (req.body.email === userEmail.email) {
    return res.json({
      success: false,
      payload: null,
      message: "User not created",
    });
  }

  const result = await prisma.user.create({
    data: {
      ...req.body,
    },
  });

  res.json({
    success: true,
    payload: result,
    message: "Operation Successful",
  });
};

export const deleteUser = async (
  req: { body: { id: number } },
  res: { json: ({}: Response<User>) => void }
) => {
  const { id } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!user) {
    return res.json({
      success: false,
      payload: null,
      message: "User not found",
    });
  }

  await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });

  res.json({
    success: true,
    payload: user,
    message: `User ${user.name} deleted with id ${user.id}`,
  });
};
