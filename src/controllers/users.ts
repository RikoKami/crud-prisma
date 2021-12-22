import { Group, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const allUsers = async (
  _: any,
  res: {
    json: (arg0: {
      success: boolean;
      payload: User[];
      message: string;
    }) => void;
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
    json: (arg0: { success: boolean; payload: User; message: string }) => void;
  }
) => {
  const { id } = req.params;
  const user = await prisma.user.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      groups: true,
    },
  });

  if (!user) {
    res.json({
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
  req: { body: { name: string; email: string; groups?: Group[] } },
  res: { json: (arg0: { success: boolean; payload: User }) => void }
) => {
  const result = await prisma.user.create({
    data: {
      ...req.body,
    },
  });

  res.json({
    success: true,
    payload: result,
  });
};
